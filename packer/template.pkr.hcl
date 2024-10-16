variable "DB_PASS" {
  type = string
}

variable "DB_USER" {
  type = string
}

variable "DB_HOST" {
  type = string
}

variable "DB_PORT" {
  type = string
}

variable "DB_NAME" {
  type = string
}

variable "region" {
  type = string
}

variable "profile" {
  type = string
}

variable "ssh_username" {
  type = string
}


source "amazon-ebs" "webapp" {
  profile       = "${var.profile}"
  region        = "${var.region}"
  instance_type = "t2.micro"
  source_ami_filter {
    filters = {
      name                = "ubuntu/images/hvm-ssd/ubuntu-lunar-*"
      architecture        = "x86_64"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    owners      = ["099720109477"]
    most_recent = true
  }
  ssh_username = "${var.ssh_username}"
  ami_name     = "webapp-${formatdate("YYYY-MM-DD-hhmmss", timestamp())}"
}



build {
  sources = ["source.amazon-ebs.webapp"]

  // get the zip
  provisioner "file" {
    source      = "webapp.zip"
    destination = "/home/ubuntu/webapp.zip"
  }

  provisioner "shell" {
    environment_vars = [
      "DB_USER=${var.DB_USER}",
      "DB_PASS=${var.DB_PASS}",
      "DB_HOST=${var.DB_HOST}",
      "DB_PORT=${var.DB_PORT}",
      "DB_NAME=${var.DB_NAME}"
    ]
    script = "scripts/install_node.sh"
  }

  provisioner "shell" {
    environment_vars = [
      "DB_USER=${var.DB_USER}",
      "DB_PASS=${var.DB_PASS}"
    ]
    script = "scripts/install_mysql.sh"
  }

  provisioner "shell" {
    inline = [
      "sudo mkdir -p /etc/systemd/system/webapp.service.d",
      # Create a drop-in file to define environment variables
      "sudo tee /etc/systemd/system/webapp.service.d/env.conf > /dev/null <<EOL",
      "[Service]",
      "Environment=DB_HOST=${var.DB_HOST}",
      "Environment=DB_USER=${var.DB_USER}",
      "Environment=DB_PASS=${var.DB_PASS}",
      "Environment=DB_PORT=${var.DB_PORT}",
      "Environment=DB_NAME=${var.DB_NAME}",
      "EOL",
      # Reload systemd to apply the changes
      "sudo systemctl daemon-reload"
    ]
  }

  provisioner "shell" {
    environment_vars = [
      "DB_USER=${var.DB_USER}",
      "DB_PASS=${var.DB_PASS}",
      "DB_HOST=${var.DB_HOST}",
      "DB_PORT=${var.DB_PORT}",
      "DB_NAME=${var.DB_NAME}"
    ]
    script = "scripts/run_migration.sh"
  }

  provisioner "shell" {
    environment_vars = [
      "DB_USER=${var.DB_USER}",
      "DB_PASS=${var.DB_PASS}",
      "DB_HOST=${var.DB_HOST}",
      "DB_PORT=${var.DB_PORT}",
      "DB_NAME=${var.DB_NAME}"
    ]
    script = "scripts/systemd.sh"
  }
}
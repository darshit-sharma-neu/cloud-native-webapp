variable "DB_PASS"{
    type = string
}

variable "DB_USER"{
    type = string
}


source "amazon-ebs" "webapp" {
  profile       = "dev"
  region        = "us-east-1"
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
  ssh_username = "ubuntu"
  ami_name     = "webapp-${formatdate("YYYY-MM-DD-hhmmss", timestamp())}"
}



build {
  sources = ["source.amazon-ebs.webapp"]

   // get the zip
  provisioner "file" {
    source     = "webapp.zip"
    destination = "/home/ubuntu/webapp.zip"
  }

  provisioner "shell" {
    script = "scripts/install_node.sh"
  }

  provisioner "shell" {
    environment_vars = [
      "DB_USER=${var.DB_USER}",
      "DB_PASS=${var.DB_PASS}"
    ]
    script = "scripts/install_mysql.sh"
  }

# provisioner "shell"{
#     script = "scripts/install_webapp.sh"
# }

  // install the dependencies

  // run the app
}

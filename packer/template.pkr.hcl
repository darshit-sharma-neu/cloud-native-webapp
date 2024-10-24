# Define variables

variable "region" {
  type = string
}

variable "ssh_username" {
  type = string
}

variable "instance_type" {
  type = string
}

variable "source_ami" {
  type = string
}

packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "webapp" {
  region        = "${var.region}"
  instance_type = "${var.instance_type}"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  ami_name      = "webapp-${formatdate("YYYY-MM-DD-hhmmss", timestamp())}"
  ami_users     = ["442042553645", "911167914313"]
}

build {
  sources = ["source.amazon-ebs.webapp"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "shell" {
    script = "scripts/create_user.sh"
  }

  provisioner "shell" {
    script = "scripts/install_node.sh"
  }

  provisioner "shell" {
    script = "scripts/systemd.sh"
  }
}

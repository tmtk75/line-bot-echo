variable "heroku_email" {}
variable "heroku_api_key" {}
variable "app_name" { default = "line-bot-air2phar" }
variable "line_client_id"             {}
variable "line_channel_secret"        {}
variable "line_trusted_user_with_acl" {}

provider "heroku" {
    email   = "${var.heroku_email}"
    api_key = "${var.heroku_api_key}"
}

resource "heroku_app" "line-bot" {
    name   = "${var.app_name}"
    region = "us"

    config_vars {
        LINE_CLIENT_ID             = "${var.line_client_id     }"
        LINE_CHANNEL_SECRET        = "${var.line_channel_secret}"
        LINE_TRUSTED_USER_WITH_ACL = "${var.line_trusted_user_with_acl}"
    }
}


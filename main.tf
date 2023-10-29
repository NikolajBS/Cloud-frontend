provider "google" {
    project = "cloud-handin-project"
    region  = "us-central1"
}

resource "google_compute_address" "lb_ip" {
    name = "lb-ip"
}

resource "google_compute_backend_service" "backend_service" {
    name        = "backend-service"
    port_name   = "http"
    protocol    = "HTTP"
    timeout_sec = 10

    backend {
        group = "your-instance-group"
    }
}

resource "google_compute_health_check" "health_check" {
    name               = "health-check"
    check_interval_sec = 10
    timeout_sec        = 5
    tcp_health_check {
        port = "80"
    }
}

resource "google_compute_target_pool" "target_pool" {
    name = "target-pool"

    health_checks = [
        google_compute_health_check.health_check.self_link
    ]

    instances = [
        "your-instance-group"
    ]
}

resource "google_compute_forwarding_rule" "forwarding_rule" {
    name       = "forwarding-rule"
    ip_address = google_compute_address.lb_ip.address
    port_range = "80"
    target     = google_compute_target_pool.target_pool.self_link
}

resource "google_compute_global_forwarding_rule" "global_forwarding_rule" {
    name       = "global-forwarding-rule"
    ip_address = google_compute_address.lb_ip.address
    port_range = "80"
    target     = google_compute_target_pool.target_pool.self_link
}

resource "google_compute_firewall" "firewall" {
    name    = "firewall"
    network = "default"

    allow {
        protocol = "tcp"
        ports    = ["80"]
    }

    source_ranges = []
}
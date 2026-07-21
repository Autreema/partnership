# Partnership

A **Software Marketplace & Reseller Management System** built using **PHP, HTML, CSS, JavaScript, and MySQL**. The platform enables administrators to manage software products, customers to purchase subscriptions, and resellers to earn commissions through referral-based sales.

---

## 📖 Table of Contents

- Overview
- Features
- Technology Stack
- System Requirements
- Installation
- Project Structure
- User Roles
- Modules
- Database
- Screenshots
- Future Enhancements
- License
- Author

---

# Overview

Partnership is a web-based application designed to simplify software sales and reseller management. The system provides dedicated dashboards for administrators, resellers, and customers to manage products, subscriptions, commissions, referrals, and withdrawals efficiently.

---

# Features

## Admin

- Secure Login
- Dashboard Analytics
- Manage Users
- Manage Resellers
- Manage Software Products
- Manage Categories
- Manage Orders
- Manage Subscriptions
- Manage Commissions
- Manage Withdrawal Requests
- Reports & Analytics
- Profile Management

---

## Reseller

- Secure Login
- Dashboard Overview
- Referral Link Management
- Commission Tracking
- Withdrawal Requests
- Earnings Overview
- Performance Analytics
- Profile Management

---

## Customer

- User Registration
- Secure Login
- Browse Software Products
- Purchase Software
- Subscription Management
- Order History
- Profile Management

---

# Technology Stack

| Technology | Purpose |
|------------|---------|
| PHP | Backend Development |
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript | Client-side Functionality |
| MySQL | Database |
| Apache (XAMPP/WAMP/Laragon) | Web Server |

---

# System Requirements

- PHP 8.0+
- MySQL 5.7+ or MariaDB
- Apache Web Server
- XAMPP / WAMP / Laragon
- Modern Web Browser

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/partnership.git
```

## 2. Move Project

Copy the project folder into:

```
xampp/htdocs/
```

Example:

```
xampp/htdocs/partnership
```

## 3. Create Database

Open **phpMyAdmin** and create a database:

```
partnership
```

## 4. Import Database

Import the SQL file:

```
database/partnership.sql
```

## 5. Configure Database

Update your database configuration file.

Example:

```php
$host = "localhost";
$user = "root";
$password = "";
$database = "partnership";
```

## 6. Run the Project

Start Apache and MySQL.

Open your browser:

```
http://localhost/partnership
```

---

# Project Structure

```
partnership/
│
├── admin/
│   ├── dashboard.php
│   ├── users.php
│   ├── products.php
│   ├── commissions.php
│   └── withdrawals.php
│
├── reseller/
│   ├── dashboard.php
│   ├── referrals.php
│   ├── commissions.php
│   └── withdrawals.php
│
├── user/
│   ├── dashboard.php
│   ├── products.php
│   ├── subscriptions.php
│   └── orders.php
│
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── icons/
│
├── database/
│   └── partnership.sql
│
├── includes/
│   ├── config.php
│   ├── header.php
│   ├── footer.php
│   └── functions.php
│
├── uploads/
├── index.php
├── login.php
├── register.php
└── README.md
```

---

# User Roles

## Administrator

Responsible for managing:

- Users
- Resellers
- Software Products
- Categories
- Orders
- Subscriptions
- Commissions
- Withdrawals
- Reports

---

## Reseller

Responsible for:

- Sharing Referral Links
- Tracking Commissions
- Requesting Withdrawals
- Viewing Dashboard Analytics

---

## Customer

Responsible for:

- Purchasing Software
- Managing Subscriptions
- Viewing Orders
- Updating Profile

---

# Modules

- Authentication
- User Management
- Product Management
- Category Management
- Order Management
- Subscription Management
- Referral Management
- Commission Management
- Withdrawal Management
- Dashboard Analytics
- Reports

---

# Database

The application uses **MySQL** to manage:

- Users
- Admins
- Resellers
- Products
- Categories
- Orders
- Subscriptions
- Referral Links
- Commissions
- Withdrawals

---

# Screenshots

Add screenshots of the following pages:

- Home Page
- Login Page
- Admin Dashboard
- Reseller Dashboard
- Customer Dashboard
- Product Listing
- Referral Management
- Commission Management
- Withdrawal Management

---

# Security Features

- Secure Authentication
- Session Management
- Role-Based Access Control
- Password Encryption
- Input Validation
- SQL Injection Protection

---

# Future Enhancements

- Payment Gateway Integration
- Email Notifications
- SMS Notifications
- Invoice Generation
- Multi-language Support
- Real-time Notifications
- Advanced Reports
- REST API

---

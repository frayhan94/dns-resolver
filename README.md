# DNS Resolver Microservice

## Overview

This microservice checks DNS records (**SPF**, **DKIM**, and **DMARC**) for specified domains to help verify email authentication configurations. The service saves the results in a SQLite database, runs periodic checks, and provides API endpoints to manually trigger checks and retrieve stored results.

## Features

- **SPF Record Check**: Verifies if the domain’s SPF record is valid.
- **DKIM Record Check**: Checks for the presence and validity of a DKIM record.
- **DMARC Record Check**: Confirms if a DMARC record exists and is properly configured.
- **Periodic Checks**: Runs hourly checks on predefined domains.
- **Database Storage**: Stores each check’s results with a timestamp.
- **API Endpoints**: Allows manual checks and retrieval of DNS results via a RESTful API.

## Prerequisites

- **Node.js** (to run the server) I am using node v20.12.2
- **SQLite** (for storing DNS check results)

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/frayhan94/dns-resolver
   cd dns-resolver


2. **Install dependencies**:
   ```bash
   npm install

3. **Start the server**:
   ```bash
   node index.js

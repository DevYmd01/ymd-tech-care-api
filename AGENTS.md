# AGENTS.md

# Project Overview

This project is an ERP-style inventory and business management backend.

Core modules:
- Inventory
- Lot Management
- Reservation
- Sales
- Purchasing
- Stock Movement
- Transaction History

Tech stack:
- NestJS
- TypeScript
- MySQL
- Clean Architecture

---

# Architecture Rules

## Layer Structure

Controller
-> Application Service
-> Domain Logic
-> Repository
-> Database

## Rules

- Controllers must stay thin
- Business logic belongs in services/domain
- Repositories handle database access only
- Domain layer must not access Express or HTTP objects
- Avoid putting business rules inside controllers

---

# Inventory Rules

## IMPORTANT

- Never update stock directly
- All stock changes must create movement history
- Always use transaction for stock movement
- Rollback transaction if any step fails

## Quantity Rules

- Convert qty to base unit before calculation
- Use smallest/base unit internally
- Never calculate mixed UOM directly

Example:
BOX -> PCS conversion required before stock calculation

## Reservation Rules

- qty_on_hand = physical stock
- qty_reserved = reserved stock
- qty_available = qty_on_hand - qty_reserved

Do not mix meanings.

## Negative Stock

- Stock cannot go negative
- Reserved qty cannot exceed available qty
- Validate before deducting stock

---

# Lot Rules

## Receiving

Receiving stock must:
- create lot
- create movement history
- increase on_hand

## Selling

Selling stock must:
- deduct reserved first if exists
- reduce lot balance
- create movement history

## Traceability

Every stock movement must be traceable by:
- transaction type
- document number
- created_by
- timestamp

---

# Transaction Rules

## REQUIRED

Use database transaction when:
- receiving stock
- selling stock
- reserving stock
- adjusting stock
- transferring stock

## NEVER

- Never partially update inventory
- Never update multiple tables without transaction
- Never skip rollback handling

---

# Database Rules

## Naming

- snake_case for database columns
- singular table names allowed
- consistent foreign key naming

Examples:
- item_id
- lot_id
- transaction_id

## Migration Safety

- Do not remove columns automatically
- Ask before changing schema
- Preserve backward compatibility

---

# TypeScript Rules

## STRICT MODE

- Avoid any
- Prefer explicit typing
- Use DTO validation
- Use readonly where possible

## Async Rules

- Use async/await consistently
- Handle errors properly
- Never ignore Promise rejection

---

# NestJS Rules

## DTO

- Validate all input
- Use class-validator
- Use transformation where necessary

## Service Rules

- One responsibility per service
- Avoid giant services
- Split validation logic if needed

---

# Code Style

- Keep functions small
- Prefer readable code over clever code
- Avoid duplicate utility functions
- Reuse shared helpers

---

# AI Agent Constraints

## DO NOT

- Do not refactor unrelated modules
- Do not rename files without reason
- Do not modify architecture without approval
- Do not generate fake business rules
- Do not assume inventory behavior

## ALWAYS

- Explain transaction impact
- Preserve existing flow
- Check inventory consistency
- Respect business constraints

---

# Testing

Before finishing:
- run tests
- check TypeScript errors
- verify transaction flow
- verify inventory calculations

---

# Important Business Concepts

Inventory calculations are business critical.

Incorrect logic may cause:
- stock mismatch
- accounting issues
- reservation errors
- incorrect lot tracking

Accuracy is more important than code brevity.

---

# Development Priority

Priority order:
1. Correct business logic
2. Data consistency
3. Transaction safety
4. Maintainability
5. Performance
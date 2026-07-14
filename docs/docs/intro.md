---
sidebar_position: 1
---

# Eurydice Docs

Eurydice is a focus-first project management app with a modern web frontend, a modular NestJS backend, and event-driven game progression.

This documentation set is organized around the code that exists today. It covers the current frontend, backend, development flow, organizational rules, and reference material needed to work in the repository without chasing legacy ideas.

## What is covered

| Area         | Purpose                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------- |
| Frontend     | Next.js App Router, localization, dashboard widgets, and the design system used in the web app |
| Backend      | NestJS modules, Prisma data access, RabbitMQ event handling, and API delivery                  |
| Development  | Local setup, testing, and deployment commands                                                  |
| Organization | Team structure, working rules, delivery flow, and maintenance expectations                     |
| Reference    | API entry points, environment expectations, and git workflow rules                             |

## Quick start

If you are new to the codebase, read these pages in order:

1. [Frontend architecture](architecture/frontend)
2. [Backend architecture](architecture/backend)
3. [Local setup](development/local-setup)
4. [Testing](development/testing)
5. [Deployment](development/deployment)
6. [Organization](organization)

## Current product shape

Eurydice currently ships as a task and project workspace with:

- dashboard widgets for projects, tasks, time tracking, and weekly stats
- authenticated account and settings flows
- a versioned REST API with Swagger documentation
- PostgreSQL persistence through Prisma
- RabbitMQ events for XP and game progression work

## Team organization

The organization guide explains how the team should work across branches, reviews, releases, and ongoing maintenance.

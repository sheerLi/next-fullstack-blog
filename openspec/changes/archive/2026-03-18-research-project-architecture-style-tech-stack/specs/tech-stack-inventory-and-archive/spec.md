## ADDED Requirements

### Requirement: Build technology stack inventory
The system MUST create an inventory of runtime and development stack elements, including framework, language, database, API tooling, UI stack, and quality tooling.

#### Scenario: Inventory covers core stack dimensions
- **WHEN** inventory generation is completed
- **THEN** it MUST list core stack dimensions with current in-repo evidence

### Requirement: Distinguish foundational and optional dependencies
The system MUST distinguish foundational dependencies from optional or feature-specific dependencies to clarify architectural criticality.

#### Scenario: Dependency criticality is visible
- **WHEN** maintainers review dependency inventory
- **THEN** each listed dependency group MUST be labeled by role and criticality

### Requirement: Archive findings for reuse
The system MUST archive stack findings in a format reusable by later changes, reviews, and onboarding activities.

#### Scenario: Archive supports future changes
- **WHEN** a later change references project baseline
- **THEN** maintainers MUST be able to reuse archived stack findings without redoing full discovery

# Accessibility Remediation Specs

This directory contains remediation specifications for accessibility issues identified in the [WCAG 2.1 Accessibility Audit](/workspace/docs/accessibility/audits/accessibility_report.md).

## Summary

| Priority | Count | Description |
|----------|-------|-------------|
| Priority 1 (Critical) | 3 | Motion accessibility, focus traps |
| Priority 2 (High) | 5 | Color contrast, skip link, keyboard navigation |
| Priority 3 (Medium) | 3 | ARIA labels, progress bars, form fields |
| Priority 4 (Low) | 2 | Decorative elements, external links |
| **Total** | **13** | |

## Specs by Priority

### Priority 1 - Critical (Immediate)

| ID | Title | WCAG | Effort | Files |
|----|-------|------|--------|-------|
| [spec-001](./spec-001-reduced-motion-support.md) | Add prefers-reduced-motion support | 2.3.3, 2.2.2 | Medium | global.css, TypingText.tsx, Hero.tsx |
| [spec-002](./spec-002-mobile-menu-focus-trap.md) | Implement focus trap in mobile menu | 2.1.2, 2.4.3 | Medium | MobileMenu.tsx |
| [spec-003](./spec-003-project-modal-focus-trap.md) | Implement focus trap in project modal | 2.1.2, 2.4.3 | Medium | ProjectModal.tsx, ProjectsGrid.tsx |

### Priority 2 - High

| ID | Title | WCAG | Effort | Files |
|----|-------|------|--------|-------|
| [spec-004](./spec-004-color-contrast-fixes.md) | Fix color contrast issues across site | 1.4.3 | Low | Multiple (11 files) |
| [spec-005](./spec-005-skip-link.md) | Add skip link for keyboard navigation | 2.4.1 | Low | AppShell.tsx |
| [spec-006](./spec-006-contact-modal-focus.md) | Fix contact modal focus management | 2.4.3, 2.1.2 | Medium | ContactModal.tsx, ContactSection.tsx |
| [spec-007](./spec-007-font-selector-keyboard.md) | Make font selector keyboard accessible | 2.1.1 | Medium | FontSelector.tsx |
| [spec-008](./spec-008-interactive-cards-keyboard.md) | Make about section cards keyboard accessible | 2.1.1 | Low | CharacterSheetCard.tsx, ScorecardCard.tsx, TrailMapCard.tsx |

### Priority 3 - Medium

| ID | Title | WCAG | Effort | Files |
|----|-------|------|--------|-------|
| [spec-009](./spec-009-navigation-aria-label.md) | Add aria-label to navigation elements | 4.1.2 | Low | MainNav.tsx, MobileMenu.tsx |
| [spec-010](./spec-010-progress-bars-accessible.md) | Make progress/stat bars accessible | 4.1.2 | Low | CharacterSheetCard.tsx |
| [spec-011](./spec-011-form-required-fields.md) | Make required field indicators accessible | 3.3.2 | Low | ContactModal.tsx |

### Priority 4 - Low

| ID | Title | WCAG | Effort | Files |
|----|-------|------|--------|-------|
| [spec-012](./spec-012-decorative-elements-hidden.md) | Hide decorative elements from AT | 1.3.1 | Low | Multiple (8 files) |
| [spec-013](./spec-013-external-link-indication.md) | Indicate external links open in new tab | 3.2.5 | Low | SocialLinks.tsx, ProjectModal.tsx |

## WCAG Criteria Coverage

| WCAG Level | Criteria Count | Specs Addressing |
|------------|----------------|------------------|
| Level A | 8 criteria | 001-011 |
| Level AA | 1 criterion | 004 |
| Level AAA | 2 criteria | 001 (best practice), 013 |

### Level A Violations (Must Fix)
- 2.1.1 Keyboard - spec-007, spec-008
- 2.1.2 No Keyboard Trap - spec-002, spec-003, spec-006
- 2.4.1 Bypass Blocks - spec-005
- 2.4.3 Focus Order - spec-002, spec-003, spec-006
- 3.3.2 Labels or Instructions - spec-011
- 4.1.2 Name, Role, Value - spec-009, spec-010

### Level AA Violations
- 1.4.3 Contrast (Minimum) - spec-004

## Dependency Graph

```
spec-001 (reduced motion) - Foundation for animation handling
    |
    v
spec-002 (mobile menu focus) -----> Uses focus-trap-react
spec-003 (project modal focus) ---> Uses focus-trap-react
spec-006 (contact modal focus) ---> Uses focus-trap-react

All other specs are independent and can be implemented in parallel.
```

## Implementation Order

### Phase 1: Critical Foundation (Week 1)
1. **spec-001**: Reduced motion support (foundation for all animations)
2. **spec-002**: Mobile menu focus trap
3. **spec-003**: Project modal focus trap

### Phase 2: High Priority (Week 1-2)
4. **spec-004**: Color contrast fixes (independent, quick win)
5. **spec-005**: Skip link (independent, quick win)
6. **spec-006**: Contact modal focus
7. **spec-007**: Font selector keyboard
8. **spec-008**: Interactive cards keyboard

### Phase 3: Medium Priority (Week 2-3)
9. **spec-009**: Navigation aria-labels
10. **spec-010**: Progress bars accessible
11. **spec-011**: Form required fields

### Phase 4: Polish (Week 3)
12. **spec-012**: Hide decorative elements
13. **spec-013**: External link indication

## Effort Estimates

| Effort Level | Hours | Specs |
|--------------|-------|-------|
| Low | 1-2 hours | 004, 005, 008, 009, 010, 011, 012, 013 |
| Medium | 2-4 hours | 001, 002, 003, 006, 007 |

**Total estimated effort:** 20-30 hours

## Shared Dependencies

Several specs require the `focus-trap-react` library:
- spec-002: Mobile menu focus trap
- spec-003: Project modal focus trap
- spec-006: Contact modal focus

**Recommendation:** Install this dependency before starting Phase 1:
```bash
npm install focus-trap-react
```

## Files Most Frequently Modified

| File | Spec Count | Specs |
|------|------------|-------|
| ContactModal.tsx | 2 | 006, 011 |
| CharacterSheetCard.tsx | 3 | 008, 010, 012 |
| AppShell.tsx | 2 | 005, 012 |
| MobileMenu.tsx | 2 | 002, 009 |
| FontSelector.tsx | 1 | 007 |
| ProjectModal.tsx | 2 | 003, 012 |

## Testing Tools

- **Automated:** axe-core, Lighthouse accessibility audit
- **Screen Readers:** VoiceOver (macOS), NVDA (Windows)
- **Keyboard:** Tab/Shift+Tab navigation testing
- **Visual:** Color contrast checkers, zoom testing at 200%
- **Motion:** System reduced motion preference toggle

## Testing Checklist

### Before Each Implementation
- [ ] Run Lighthouse accessibility audit (baseline score)
- [ ] Test with keyboard navigation
- [ ] Test with VoiceOver or NVDA

### After Each Implementation
- [ ] Run Lighthouse accessibility audit (verify improvement)
- [ ] Verify specific WCAG criteria addressed
- [ ] Test with keyboard navigation
- [ ] Test with screen reader
- [ ] Document any additional findings

## Progress Tracking

After implementing a spec:
1. Move the spec file to `/workspace/docs/accessibility/specs/completed/`
2. Update this README to mark as completed
3. Run accessibility tests to verify fix
4. Document any additional findings

---

*Generated from accessibility audit on 2026-01-15*
*Last updated: 2026-01-15*

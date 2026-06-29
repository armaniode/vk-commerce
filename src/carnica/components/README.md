# Carnica Components Architecture

Public component imports are namespaced by platform:

```tsx
import { components } from '../carnica';
import { Button } from '../carnica/components/web';

components.web.Button;
```

Do not add new runtime components directly under `src/carnica/components/`.

## Naming convention

| Namespace | Path | Purpose |
|---|---|---|
| `components.app` | `src/carnica/components/app/` | APP/mobile components from `05_Carnica UI-kit APP`. |
| `components.web` | `src/carnica/components/web/` | WEB components from `06_Carnica UI-kit WEB` and beeline.ru patterns. |

## Current component inventory

| Component | Namespace | Classification | Source/status |
|---|---|---|---|
| `Badge` | `components.app` | APP-ready | Matches APP `badge 3.0` passport. |
| `Button` | `components.app` | APP-ready | Matches APP `button 2.5` passport. |
| `Spinner` | `components.app` | APP-ready | Matches APP `spinner 2.1` passport. |
| `StoriesBadge` | `components.app` | APP-only | Separate stories marker; not a general `Badge` variant. |
| `Button` | `components.web` | WEB-only | Matches WEB `button 2.1` passport. |
| `ButtonInlineText` | `components.web` | WEB-only | Matches WEB `button inline text 2.1` passport. |
| `Header` | `components.web` | WEB-only | Matches Beeline WEB `header/main` reference. |
| `BeelineBall` | `components.web` | WEB-only | Header logo helper; fixed Beeline SVG mark. |

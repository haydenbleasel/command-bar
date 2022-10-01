# command-bar

`command-bar` is a pre-configured [cmdk](https://github.com/pacocoursey/cmdk) instance with:

- A useful `useCommandBar` hook
- Predefined keyboard shortcuts
- Gamepad support
- Subtle pop animation + automatic input re-focusing when changing page

## Installation

```bash
yarn add @haydenbleasel/command-bar
```

## Usage

You can use `command-bar` the same way you would use `cmdk`, with a few additions:

```tsx
import { CommandBar, useCommandBar } from '@haydenbleasel/command-bar';

const App = () => {
  const commandBar = useCommandBar();

  return (
    <CommandBar.Dialog>
      <CommandBar.Container>
        <CommandBar.Input />
        <CommandBar.List>
          <CommandBar.Empty>Empty State</CommandBar.Empty>
          <CommandBar.Loading />
          <Command.Group heading="Letters">
            <Command.Item>a</Command.Item>
            <Command.Item>b</Command.Item>
            <Command.Separator />
            <Command.Item>c</Command.Item>
          </Command.Group>
        </CommandBar.List>
      </CommandBar.Container>
    </CommandBar.Dialog>
  );
};
```

## Keyboard Shortcuts

- Meta Key + `k`: Toggles the command bar. On Mac, this is `cmd+k`. On Windows, this is `ctrl+k`.
- `Backspace`: If the search input is empty, goes back to the root.
- `Escape`: If you're on the root, closes the command bar. If you're not, goes back to the root.

## Gamepad Support

Relies on [@haydenbleasel/use-gamepad-events](https://github.com/haydenbleasel/use-gamepad-events) to map Gamepad buttons to commandbar actions:

- `y`: opens and closes the commandbar, utilising `toggleOpen` from `useCommandBar`
- `b`: goes back to the root, utilising `setPage('')` from `useCommandBar`
- `a`: selects the current item, utilising `select` from `useCommandBar`
- `up` / `down`: navigates the commandbar, utiling `setIndex` from `useCommandBar`

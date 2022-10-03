# command-bar

`command-bar` is a pre-configured [cmdk](https://github.com/pacocoursey/cmdk) instance with:

- A useful `useCommandBar` hook
- Predefined keyboard shortcuts
- Gamepad support
- Subtle pop animation + automatic input re-focusing when changing page
- Closes when you click outside of it

## Installation

```bash
yarn add @haydenbleasel/command-bar
```

## Usage

You can use `command-bar` the same way you would use `cmdk`, with a few additions. Here's an example with Tailwind:

```tsx
import { CommandBar, useCommandBar } from '@haydenbleasel/command-bar';

const App = () => {
  const commandBar = useCommandBar();

  return (
    <CommandBar.Dialog className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm dark:bg-gray-800/80">
      <CommandBar.Container className="w-full max-w-xl rounded-md border border-gray-200 bg-white drop-shadow-2xl transition-transform dark:border-gray-700 dark:bg-gray-900">
        <CommandBar.Input className="w-full bg-transparent py-3 text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-600" />
        <CommandBar.List className="h-full max-h-[25rem] min-h-[15rem] overflow-auto p-4 text-sm text-gray-500 dark:text-gray-400">
          <CommandBar.Empty>Empty State</CommandBar.Empty>
          <CommandBar.Loading />
          <CommandBar.Group
            className="mb-4 space-y-1 last:mb-0"
            heading="Letters"
          >
            <CommandBar.Item className="text-md aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 -mx-2 flex cursor-pointer items-center justify-between gap-2 rounded-sm p-2">
              a
            </CommandBar.Item>
            <CommandBar.Item className="text-md aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 -mx-2 flex cursor-pointer items-center justify-between gap-2 rounded-sm p-2">
              b
            </CommandBar.Item>
            <CommandBar.Separator />
            <CommandBar.Item className="text-md aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 -mx-2 flex cursor-pointer items-center justify-between gap-2 rounded-sm p-2">
              c
            </CommandBar.Item>
          </CommandBar.Group>
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

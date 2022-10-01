import { useKeyboardEvent } from '@react-hookz/web';
import { Command } from 'cmdk';
import type { FC, HTMLProps, RefObject } from 'react';
import { createContext, useContext, useEffect, useRef } from 'react';
import create from 'zustand';
import useGamepadEvents from '@haydenbleasel/use-gamepad-events';

export const useCommandBar = create<{
  open: boolean;
  page: string;
  search: string;
  value: string;
  toggleOpen: (open?: boolean) => void;
  setPage: (page: string) => void;
  setSearch: (search: string) => void;
  setValue: (value: string) => void;
  index: number;
  setIndex: (value: number | ((index: number) => number)) => void;
  select: () => void;
}>((set) => ({
  open: false,
  page: '',
  search: '',
  value: '',
  toggleOpen: (newOpen?: boolean) =>
    set((state) => ({
      open: typeof newOpen === 'boolean' ? newOpen : !state.open,
    })),
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),
  setValue: (value) => set({ value }),
  index: 0,
  setIndex: (value) =>
    set((state) => {
      const newIndex = typeof value === 'function' ? value(state.index) : value;

      const allElements = document.querySelectorAll('[cmdk-item]');
      const element = allElements[newIndex] as HTMLElement | undefined;

      if (newIndex < 0) {
        return { index: 0 };
      }

      if (newIndex >= allElements.length) {
        return { index: allElements.length - 1 };
      }

      if (element) {
        allElements.forEach((el) => {
          el.removeAttribute('aria-selected');
        });
        element.setAttribute('aria-selected', 'true');
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }

      return { index: newIndex };
    }),
  select: () => {
    const activeElement = document.querySelector(
      '[cmdk-item][aria-selected="true"]'
    );

    if (activeElement) {
      (activeElement as HTMLDivElement).click();
    }
  },
}));

const InputRefContext = createContext<RefObject<HTMLInputElement> | null>(null);

const Input: FC<typeof Command.Input> = (props) => {
  const { search, setSearch, page } = useCommandBar();
  const inputRef = useContext(InputRefContext);

  return (
    <Command.Input
      placeholder={page ? `${page}...` : 'Start typing...'}
      value={search}
      onValueChange={setSearch}
      ref={inputRef}
      {...props}
    />
  );
};

const Container: FC<HTMLProps<HTMLDivElement>> = (props) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { setSearch, page } = useCommandBar();
  const inputRef = useContext(InputRefContext);

  useEffect(() => {
    inputRef?.current?.focus();
    setSearch('');

    dialogRef.current?.style.setProperty('transform', 'scale(0.98)');

    setTimeout(() => {
      dialogRef.current?.style.setProperty('transform', 'scale(1)');
    }, 100);
  }, [inputRef, page, setSearch]);

  return <div ref={dialogRef} {...props} />;
};

const Dialog: FC<typeof Command.Dialog> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const gamepadEvents = useGamepadEvents();
  const {
    open,
    toggleOpen,
    value,
    setValue,
    search,
    page,
    setPage,
    setIndex,
    select,
  } = useCommandBar();

  useKeyboardEvent(
    true,
    (event) => {
      if (event.key === 'k' && event.metaKey) {
        toggleOpen();
        return;
      }

      if (
        (!search || page) &&
        (event.key === 'Escape' || event.key === 'Backspace')
      ) {
        setPage('');
        return;
      }

      if (event.key === 'Escape') {
        toggleOpen(false);
      }
    },
    [],
    { eventOptions: { passive: true } }
  );

  gamepadEvents.on('y', toggleOpen);

  gamepadEvents.on('down', () => {
    if (typeof window === 'undefined' || !open) {
      return;
    }

    setIndex((index) => index + 1);
  });

  gamepadEvents.on('a', () => {
    if (typeof window === 'undefined' || !open) {
      return;
    }

    select();
  });

  gamepadEvents.on('b', () => {
    if (typeof window === 'undefined' || !open) {
      return;
    }

    setPage('');
  });

  gamepadEvents.on('up', () => {
    if (typeof window === 'undefined' || !open) {
      return;
    }

    setIndex((index) => index - 1);
  });

  useEffect(() => setIndex(0), [page, setIndex]);

  return (
    <InputRefContext.Provider value={inputRef}>
      <Command.Dialog
        value={value}
        onValueChange={setValue}
        open={open}
        onOpenChange={toggleOpen}
        label="Global Command Menu"
        {...props}
      />
    </InputRefContext.Provider>
  );
};

export const CommandBar = {
  Dialog,
  Container,
  Input,
  List: Command.List,
  Empty: Command.Empty,
  Group: Command.Group,
  Item: Command.Item,
  Loading: Command.Loading,
  Separator: Command.Separator,
};

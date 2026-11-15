import { component$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { navigation, projectRequest } from "~/lib/navigation";
import { Arrow } from "../ui/arrow";

export const Header = component$(() => {
  const menuOpen = useSignal(false);
  const menuButton = useSignal<HTMLButtonElement>();
  const location = useLocation();

  return (
    <header
      class="site-header"
      onKeyDown$={(event) => {
        if (event.key === "Escape") {
          menuOpen.value = false;
          menuButton.value?.focus();
        }
      }}
    >
      <div class="shell header-inner">
        <a href="/" class="brand" aria-label="Studio Forma, homepage">
          <svg
            aria-hidden="true"
            viewBox="0 0 40 40"
            width="38"
            height="38"
            fill="none"
          >
            <path d="M4 35V5h30v8H13v7h17v8H13v7Z" fill="currentColor" />
            <path d="M26 35v-7h8v7Z" fill="currentColor" />
          </svg>
          <span>
            studio
            <span class="brand-forma">
              forma<span class="brand-dot">.</span>
            </span>
          </span>
        </a>
        <button
          ref={menuButton}
          type="button"
          class="menu-toggle"
          aria-expanded={menuOpen.value}
          aria-controls="main-navigation"
          onClick$={() => {
            menuOpen.value = !menuOpen.value;
          }}
        >
          {menuOpen.value ? "Chiudi" : "Menu"}
          <span aria-hidden="true">{menuOpen.value ? "−" : "+"}</span>
        </button>
        <nav
          id="main-navigation"
          aria-label="Navigazione principale"
          class={["main-navigation", { "is-open": menuOpen.value }]}
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={
                location.url.pathname === item.href ? "page" : undefined
              }
              onClick$={() => {
                menuOpen.value = false;
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={projectRequest.href}
            class="nav-request"
            aria-current={
              location.url.pathname === projectRequest.href ? "page" : undefined
            }
            onClick$={() => {
              menuOpen.value = false;
            }}
          >
            {projectRequest.label}
            <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
});

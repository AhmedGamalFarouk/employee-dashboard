import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('employee-dashboard');

  // Theme state
  protected isDarkMode = signal(true);

  // Sidebar lock state
  protected isSidebarLocked = signal(false);

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Restore theme from localStorage or system preference
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        this.isDarkMode.set(false);
        document.documentElement.setAttribute('data-theme', 'light');
      }

      // Restore sidebar lock state from localStorage
      const sidebarLocked = localStorage.getItem('sidebarLocked');
      if (sidebarLocked === 'true') {
        this.isSidebarLocked.set(true);
      }

      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.isDarkMode.set(e.matches);
          if (e.matches) {
            document.documentElement.removeAttribute('data-theme');
          } else {
            document.documentElement.setAttribute('data-theme', 'light');
          }
        }
      });
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(v => !v);
    if (isPlatformBrowser(this.platformId)) {
      const newTheme = this.isDarkMode() ? 'dark' : 'light';
      if (newTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
      localStorage.setItem('theme', newTheme);
    }
  }

  toggleSidebarLock(): void {
    this.isSidebarLocked.update(v => !v);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('sidebarLocked', this.isSidebarLocked() ? 'true' : 'false');
    }
  }
}

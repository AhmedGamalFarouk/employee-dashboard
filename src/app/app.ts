import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, TranslateModule],
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

  private language = signal(localStorage.getItem("lang") || "ar");
  private translate = inject(TranslateService);

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

      if (localStorage.getItem("lang")) {
        this.setLanguage(localStorage.getItem("lang")!)
      }
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

  changeLanguage() {
    this.language() === "ar" ? this.language.set("en") : this.language.set("ar");
    this.setLanguage(this.language());
    localStorage.setItem("lang", this.language())
  }
  setLanguage(lang = "ar") {
    const language = this.language();
    this.translate.use(language as string);
    document.documentElement.dir = this.language() === "ar" ? 'rtl' : 'ltr';
  }
}

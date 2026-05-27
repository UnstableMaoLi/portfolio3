import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';

test.describe('Практична робота №10: E2E тести портфоліо', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => window.localStorage.clear());
  });

  test('Головна сторінка має правильний заголовок', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await expect(page).toHaveTitle(/Adaptive Portfolio/);
    await expect(homePage.heading).toContainText('Tamara Korol');
  });

  test('Головна сторінка містить ключові елементи та правильні посилання', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await expect(homePage.aboutSection).toContainText('About me');
    await expect(homePage.skillsCards).toHaveCount(2);
    await expect(homePage.viewProjectsLink).toHaveAttribute('href', '#/projects');
    await expect(homePage.contactLink).toHaveAttribute('href', '#/contacts');
  });

  test('Сторінка Projects показує картки проєктів', async ({ page }) => {
    const projectsPage = new ProjectsPage(page);

    await projectsPage.goto();

    await expect(projectsPage.heading).toBeVisible();
    await expect(projectsPage.cards).toHaveCount(5);
    await expect(projectsPage.projectCard('Portfolio landing page')).toBeVisible();
  });

 test('Пошук на сторінці Projects фільтрує список проєктів', async ({ page }) => {
  const projectsPage = new ProjectsPage(page);

  await projectsPage.goto();
  await projectsPage.searchProject('Reactive state');

  await expect(projectsPage.resultCount).toContainText('Found projects: 1 / 5');
  await expect(projectsPage.cards).toHaveCount(1);
  await expect(projectsPage.projectCard('Interactive contact form')).toBeVisible();
});

  test('Кнопка Details відкриває деталі конкретного проєкту', async ({ page }) => {
    const projectsPage = new ProjectsPage(page);

    await projectsPage.goto();
    await projectsPage.showDetails('Study task helper');

    await expect(projectsPage.selectedProject).toContainText('Study task helper');
    await expect(projectsPage.selectedProject).toContainText('JavaScript');
    await expect(projectsPage.selectedProject).toContainText('2025');
  });
});

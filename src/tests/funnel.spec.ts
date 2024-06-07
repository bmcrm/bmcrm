import { test, expect } from 'playwright-test-coverage';

import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

// Initialize AWS SSM client to pull login credentials of the testuser
const client = new SSMClient({ region: 'us-east-1' });
function getParameter(name: string): Promise<string> {
  const resp = client.send(new GetParameterCommand({ Name: name }));
  return resp.then(r => r.Parameter?.Value || '');
}

const LOGIN_URL = 'https://app.dev.bmcrm.camp/login';
const FUNNEL_URL = 'https://app.dev.bmcrm.camp/login';

// we have separate test account for a TCO persona and a Camper persona
const TEST_ACCOUNT_TCO_EMAIL = await getParameter('/webapp/test/tco_email');
const TEST_ACCOUNT_TCO_PASSWORD = await getParameter('/webapp/test/tco_password');

test('successful invite open modal', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.fill('input[name="email"]', TEST_ACCOUNT_TCO_EMAIL);
  await page.fill('input[name="password"]', TEST_ACCOUNT_TCO_PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(FUNNEL_URL);
  await expect(page.locator('text=Invite')).toBeVisible();
  await page.locator('text=Invite').click();
  await expect(page.locator('text=Invite User by Email')).toBeVisible();
});

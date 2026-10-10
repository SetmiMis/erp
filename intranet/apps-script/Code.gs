// Setmi India Intranet: Apps Script web app.
// Deploy: Execute as "User accessing the web app", access "Anyone within setmiindia" (your Workspace domain).
// Then Google Sites > Insert > Embed > By URL (paste the /exec URL).
const REGISTER_ID = '1PCcQmYUYT-k1uNi6CxzQ2cuqPxvFIxPkuAOc-4ZCEXY'; // Systems Register
const PEOPLE_ID   = '15uMbv81_72e2K5HUsmpta2DJ8PVtVsavEsDN13LZirI'; // People Sheet

function doGet(e) {
  const page = (e && e.parameter.page) || 'systems';
  const t = HtmlService.createTemplateFromFile(page === 'people' ? 'People' : 'MySystems');
  t.email = Session.getActiveUser().getEmail().toLowerCase();
  return t.evaluate().setTitle('Setmi India Intranet')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function rows_(ss, tab) {
  const v = SpreadsheetApp.openById(ss).getSheetByName(tab).getDataRange().getDisplayValues();
  const head = v.shift();
  return v.filter(r => r.join('') !== '').map(r => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

// "Filter by email": the signed-in viewer sees only their own rows from Members.
function getMySystems() {
  const email = Session.getActiveUser().getEmail().toLowerCase();
  const systems = rows_(REGISTER_ID, 'Systems');
  return rows_(REGISTER_ID, 'Members')
    .filter(m => m.Email.toLowerCase() === email)
    .map(m => {
      const s = systems.find(x => x.ID === m.ID) || {};
      return { name: s.Name, what: s['What for'], role: m.Role, form: s['Form link'],
               sheet: s['Sheet link'], owner: s.Owner, status: s.Status };
    });
}

function getPeople() {
  const out = {};
  ['Contacts', 'Holidays', 'Who to ask', 'Org chart', 'Birthdays']
    .forEach(t => out[t] = rows_(PEOPLE_ID, t));
  return out;
}

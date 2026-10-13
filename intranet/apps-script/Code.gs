// Setmi India Intranet: Apps Script web app.
// Deploy: Execute as "User accessing the web app", access "Anyone within setmiindia" (your Workspace domain).
// Pages: /exec (My Systems), /exec?page=forms, /exec?page=people
const REGISTER_ID = '1b7E2sIBMa6nd3ix7ISfE1oyv1ZwpjCYRMTTcFSzx96I'; // Systems Register Setmi India
const PEOPLE_ID   = '15uMbv81_72e2K5HUsmpta2DJ8PVtVsavEsDN13LZirI'; // People Sheet
const PAGES = { systems: 'MySystems', forms: 'Forms', people: 'People' };

function doGet(e) {
  const page = (e && e.parameter.page) || 'systems';
  const t = HtmlService.createTemplateFromFile(PAGES[page] || 'MySystems');
  t.email = Session.getActiveUser().getEmail().toLowerCase();
  return t.evaluate().setTitle('Setmi India Intranet')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Header names are matched ignoring case and spaces, so "System Id" and "Name " both work.
const key_ = s => String(s).toLowerCase().replace(/\s+/g, '');
function rows_(ss, tab, raw) {
  const v = SpreadsheetApp.openById(ss).getSheetByName(tab).getDataRange().getDisplayValues();
  const head = v.shift().map(h => raw ? h.trim() : key_(h));
  return v.filter(r => r.join('') !== '').map(r => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

// "Filter by email": the signed-in viewer sees only their own rows from Members tab.
function getMySystems() {
  const email = Session.getActiveUser().getEmail().toLowerCase();
  const systems = rows_(REGISTER_ID, 'Systems tab');
  return rows_(REGISTER_ID, 'Members tab')
    .filter(m => m.email.toLowerCase() === email && m.systemid)
    .map(m => {
      const s = systems.find(x => x.systemid === m.systemid) || {};
      return { name: s.name, what: s.whatfor, role: m.role, form: s.formlink,
               sheet: s.sheetlink, app: s.applink, owner: s.owner, status: s.status };
    });
}

// Forms page: every row of Forms tab, grouped by its Group column.
function getForms() {
  const groups = {};
  rows_(REGISTER_ID, 'Forms tab').forEach(f => {
    (groups[f.group || 'Other'] = groups[f.group || 'Other'] || [])
      .push({ name: f.formname, link: f.filllink });
  });
  return groups;
}

function getPeople() {
  const out = {};
  ['Contacts', 'Holidays', 'Who to ask', 'Org chart', 'Birthdays']
    .forEach(t => out[t] = rows_(PEOPLE_ID, t, true));
  return out;
}

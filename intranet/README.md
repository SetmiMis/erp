# Company Intranet (7 pages)

Static prototype of the Google Sites plan. Open `index.html` — no build step.

| Page | File |
|---|---|
| Home | index.html |
| My Systems | systems.html |
| Forms | forms.html |
| People | people.html |
| Policies | policies.html |
| How We Work | work.html |
| Training | training.html |

All content lives in `assets/data.js` (mirrors the **Systems Register** sheet: *Systems* tab = ID, name, what for, form link, sheet link, owner, status; *Members* tab = ID, email, role).

## Moving to Google Sites
1. Create the Systems Register sheet (Systems + Members tabs) with the columns above.
2. New Google Site, 7 pages named as above. Embed Looker Studio on My Systems, filtered by `email = viewer`.
3. Forms/Policies/How We Work: buttons linking to each Google Form / Doc, same groupings as `data.js`.
4. Build order: Systems Register + People sheet → Home, Forms, People → My Systems, Policies → How We Work, Training.

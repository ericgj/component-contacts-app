The GWS contacts database project
==================================

## Roadmap

_updated 10 JUN 2013_

### (01-skeleton) Working skeleton: paginated data table with served data

1. Implement the data table, with reference to component/model  DONE
2. Faked contact list data model  DONE
3. Working data table with faked model  DONE
4. Integrate pagination  DONE
5. Contact list data model with xhr  DONE
6. Basic server endpoints with fake data. Storage not yet implemented.  DONE
7. Data table with served data (fake).  DONE 
8. Set up connection to Access, add some real-ish data.  DONE

### (02-sidebar) Milestone 1: dashboard with sidebar allowing filtering by call list

1. UI add sidebar, call list view  DONE
2. Client add event bus DONE
3. Client hook up list model, contact model to endpoints  DONE
4. Server endpoint get /contact-list  (fake models)  DONE
5. Server endpoint get /contact-list/:listid/contact (fake models)  DONE

Note: at this point we have a demo-able dashboard.

### (02-sidebar) Demo: dashboard

1. UI set up grid css
2. UI add other filter categories to sidebar (faked)
3. UI add more-all-less controller to call list view
4. UI add fake buttons & controls for rest of the dashboard


### (03-event-entry) Milestone 2: entry form by event

1. Simple in-place editing integrated with component/model (multiple elements) DONE
2. Server endpoint `get /event-list/:id`
3. Draft contact edit panel (data table + in-place editing), served view data, faked model.save
4. Draft demo page based on 02-sidebar
5. Add header fields to contact edit panel (text boxes for now), integrate with in-place editing
6. Draft contact event list model
7. Revise contact model
8. Server endpoints `post /event-list`, `put /event-list` (faked backend)


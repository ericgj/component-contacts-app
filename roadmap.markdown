The GWS contacts database project
==================================

## Roadmap: through first demo

_updated 19 MAY 2013_

__Working skeleton: paginated data table with served data__

1. Implement the data table, with reference to component/model  DONE
2. Faked contact list data model  DONE
3. Working data table with faked model  DONE
4. Integrate pagination
5. Contact list data model with xhr
6. Data table with served data (fake). Storage not yet implemented.

__Milestone 1: dashboard with sidebar allowing filtering by call list__

1. UI add sidebar, call list view
2. Client add event bus 
3. Client hook up list model, contact model to endpoints
4. Server endpoint get /lists  (fake)
5. Server endpoint get /contacts/list/:list_id (fake)

Note: at this point we have a demo-able dashboard.

__Demo 1: dashboard__

1. UI add other filter categories to sidebar (faked)
2. UI add more-all-less controller to call list view
3. UI add fake buttons & controls for rest of the dashboard
4. Server load in 'real-ish' data   


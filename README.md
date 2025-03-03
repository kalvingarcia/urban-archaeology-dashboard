# Urban Archaeology Dashboard
Author: Kalvin Garcia

This project was implemented alongside the Urban Archaeology website. The purpose was to provide a form structure to
add product data for the website. Because I'm the only person using this version, it is in an incomplete state and
using relatively inefficient code implemented in Python and KivyMD.

The goal is to eventually create a dashboard using React Native with more efficient code and more ease-of-use (now
that I know how the dahsboard would be used), so that Urban Archaeology can edit the database using the dashboard
themselves whenever they need to after the website is complete.

## Description
This project creates a database user interface for Urban Archaeology's staff to connect to the remote database,
allowing for the modification and manipulation of the data in the database, and the creation or deletion of data in
the database. The project will feature a data visualization pane, with filtering and searching functionality. It
will also feature forms for adding products, salvage, and customs information.

***The project has undergone a massive overhaul since its conception.*** Originally, I programmed the project in
Python using Kivy for the UI and psycopg2 to connect to the database. The issue is Kivy has very limited, slow, and
buggy user interfacing. While the application worked, it did not look like a piece I was proud of showing in my
portfolio.

This meant I needed to change my approach. I ultimately decided to just use React within an Electron app to more
closely match the aesthetic of the [Urban Archaeology Website](https://urbarch-website.kalvin.live). This choice
enabled me to reuse some code to save time, but also allowed me to have much more control over the design and user
experience for the application.

The legacy code can still be found in this repository under [/legacy-dashboard](legacy-dashboard).

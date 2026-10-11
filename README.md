# LAYOVER_
✈️ LAYOVER — Turn Waiting Time into Travel Time

«A smarter way to experience the world between flights.»

Layover is a travel-tech hackathon project designed to help travellers make the most of their time between flights. Instead of spending hours waiting at an airport or struggling with luggage, travellers can discover suitable activities, explore storage options, optimise expenses, and optionally connect with like-minded travellers.

Our experimental concept explores a simple question:

What if a layover became an opportunity to explore, connect, and save money instead of just waiting?

---

🌍 The Problem

A layover can give travellers a few valuable hours in an unfamiliar city. However, making the most of that time is not always easy.

Travellers may face challenges such as:

- 🧳 Luggage inconvenience: Carrying cabin baggage while exploring can be uncomfortable, even when checked baggage has already been transferred to the final destination.
- 💸 Storage expenses: Available luggage-storage services may be costly for short durations, depending on the location and provider.
- ⏳ Uncertainty about time: Travellers may struggle to determine how much free time they can safely use outside the airport.
- 🗺️ Unfamiliar destinations: Finding suitable places to visit within a limited time and budget can be difficult.
- 🤝 Missed opportunities to connect: Solo travellers may want company while exploring but have no convenient way to find compatible travel companions.
- 🔐 Safety concerns: Travellers need trustworthy storage arrangements and a reliable way to plan their return to the airport.

Not every connecting passenger needs luggage storage. Checked baggage is often transferred automatically to the final destination on eligible itineraries. Layover focuses on travellers who genuinely need help managing their belongings and available time.

💡 Our Solution

Layover aims to bring essential layover-planning features together in one platform.

Instead of treating luggage storage as the entire solution, we explore a more comprehensive approach that combines travel planning, cost optimisation, and optional social discovery.

✨ Key Features

1. Smart Layover Planner

- Enter arrival time, next departure time, airport, budget, and interests.
- Estimate the time genuinely available for exploration.
- Account for travel time, airport procedures, and a return-to-gate buffer.
- Suggest activities that fit the available time.

2. Luggage Storage Discovery

- Help travellers identify suitable luggage-storage options.
- Display available information about location, price, operating hours, and storage conditions.
- Help users compare alternatives before choosing a service.
- Support travellers who have cabin baggage or need to collect their checked luggage during a connection.

3. Experimental Shared-Storage Matching

- Explore matching travellers with overlapping schedules and compatible luggage requirements.
- Let interested travellers express a request to coordinate storage.
- Estimate potential individual savings when a provider permits shared bookings.
- Track requests and booking status.

Example: If an eligible storage booking costs ₹1,000 and an approved arrangement allows two travellers to share the cost equally, each could pay ₹500.

Actual prices, availability, and sharing permissions depend on the storage provider. Layover does not assume that every locker or storage facility permits multiple customers to share a booking.

4. Optional Traveller Connection

- Discover travellers with similar layover windows and interests.
- Connect with people who want to explore the same destination.
- Coordinate optional sightseeing plans.
- Keep social interaction separate from luggage-storage access and permissions.

5. Return-to-Airport Planning

- Estimate when a traveller should begin returning to the airport.
- Account for the planned activity duration and estimated journey back.
- Remind travellers to leave sufficient time for check-in, security, immigration, and boarding requirements, where applicable.

6. Booking and Trip Status

- Organise storage requests, booking details, and status updates.
- Show pending, accepted, and confirmed states where supported by the implementation.
- Provide a clear overview of the traveller's planned activities and storage arrangements.

---

🚀 What Makes Layover Different?

Luggage-storage services already exist, and travel-planning tools can already recommend destinations. Layover explores how these needs could work together around the specific constraints of a layover.

Existing traveller challenge| Layover's proposed approach
Unsure what to do during a layover| Time-aware activity planning
Carrying cabin baggage while sightseeing| Storage discovery and comparison
Storage costs may be too high| Cost optimisation and permitted shared-booking experiments
Wants company while exploring| Optional traveller matching
Afraid of missing the next flight| Return-time planning and safety buffers

Our proposed differentiator is the combination of layover-aware planning, luggage-related convenience, cost optimisation, and optional traveller matching in a single experience.

We do not claim that every individual feature is new. Our goal is to experiment with how these features can work together to improve the layover experience.

---

👤 Who Is Layover For?

Layover is designed for travellers such as:

- Self-transfer passengers who may need to collect and recheck their luggage between separately booked flights.
- Cabin-baggage travellers who want to explore without carrying their bags.
- Budget-conscious travellers looking for practical ways to reduce expenses.
- Solo travellers interested in discovering places with compatible travel companions.
- Travellers with long connections who want to use their free time efficiently.
- Early-arrival or late-departure travellers who need luggage-storage options before check-in or after checkout.

The platform should always account for the traveller's actual itinerary, baggage arrangements, visa and transit requirements, and available time before recommending an activity.

---

🔄 How It Works

The intended user journey is:

1. Enter trip details: Provide the airport, arrival time, next departure time, and relevant preferences.
2. Calculate usable time: Estimate the time available after accounting for airport procedures, transportation, and a safety buffer.
3. Explore options: Discover suitable activities and luggage-storage alternatives.
4. Find a compatible traveller: Optionally explore matching travellers with overlapping schedules.
5. Coordinate a booking: Submit or accept a shared-storage request only where the facility permits the arrangement.
6. Review the plan: View the selected activity, estimated costs, booking status, and return time.
7. Enjoy the layover: Explore with a plan that prioritises convenience, affordability, and a timely return.

---

🛡️ Safety and Trust

Safety is a core design consideration, not an optional extra.

Layover's proposed safeguards include:

- Profile verification: Explore ways to verify users before enabling certain interactions.
- Authorised storage: Use legitimate providers and follow their booking and access policies.
- Independent luggage control: Avoid requiring travellers to hand their belongings to strangers.
- Explicit consent: Require users to agree to a proposed arrangement before proceeding.
- Clear booking status: Distinguish requests from accepted and confirmed bookings.
- Privacy-conscious matching: Share only the information needed to coordinate a match.
- Time and itinerary checks: Avoid recommending activities that leave insufficient time to return.

Shared storage should only be offered when the provider explicitly permits it and the arrangement provides appropriate access control. If those conditions cannot be met, users should be directed to separate bookings or other authorised storage options.

Verification, secure payments, live availability, and automated notifications are proposed safeguards unless they are explicitly implemented in the current version.

---

🧰 Technology Stack

The following is the intended technology stack for the web application. Update this section to reflect the technologies actually present in the repository.

Layer| Technology| Purpose
Frontend| React| Interactive user interface
Development tooling| Vite| Local development server and build tooling
Styling| CSS| Responsive layouts and visual design
Backend and database| Supabase| Proposed authentication, PostgreSQL database, and API services
Version control| Git and GitHub| Source-code management and collaboration
AI coding assistance| GitHub Copilot or similar tools| Development support and debugging

Proposed Data Model

The application may use the following entities:

- Users: Profile information and verification status.
- Trips: Airport, flight times, layover duration, and traveller preferences.
- Storage Options: Provider, location, price, operating hours, and supported booking conditions.
- Match Requests: Compatible time windows, luggage requirements, and request status.
- Bookings: Provider reference, participants where permitted, cost allocation, and booking status.
- Activities: Suggested destinations, estimated duration, travel time, and expected expenses.

Relationships, access policies, and database constraints should be designed to prevent unauthorised access to personal information or booking records.

---

🏗️ Architecture Overview

The intended architecture separates the user interface from the application's data and business logic.

                 TRAVELLER
                     |
                     v
              React + Vite UI
                     |
                     v
            Application Logic
                     |
          +----------+----------+
          |                     |
          v                     v
   Layover Planning       Storage Matching
          |                     |
          +----------+----------+
                     |
                     v
             Backend / API
                     |
                     v
              Supabase DB
                     |
                     v
       Users, Trips, Requests,
       Storage Options, Bookings

This diagram represents the proposed architecture. External storage-provider integrations, live flight data, payment processing, and other services require separate implementation and must not be assumed to exist.

---

💻 Getting Started

Prerequisites

Before running the project, ensure you have:

- Node.js and npm installed.
- Git installed.
- VS Code or another suitable code editor.
- Access to the project repository.

If the repository uses React and Vite, follow the steps below.

1. Clone the repository

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>

Replace the placeholders with your actual repository URL and folder name.

2. Install dependencies

npm install

3. Configure environment variables

If the project uses Supabase, create a ".env" file in the project root using the variable names expected by the application.

For a standard Vite configuration, this may look like:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key

Use the actual configuration required by your Supabase client version. Never place a Supabase service-role key, private API key, or other privileged secret in frontend environment variables.

If the current project does not use Supabase, follow its actual configuration instead.

4. Start the development server

npm run dev

Open the local URL printed by Vite in your terminal.

5. Build for production

npm run build

To preview the production build locally:

npm run preview

These commands assume that the repository has the standard Vite scripts configured in "package.json".

---

🧪 Hackathon Prototype Scope

The prototype aims to demonstrate the core concept through a simple end-to-end user journey.

Core demonstration

- Enter sample layover details.
- Estimate usable exploration time.
- Display suitable activities or storage options.
- Find a compatible sample traveller.
- Submit or accept a shared-storage request.
- Calculate a potential cost split.
- Display booking and request status.
- Show an estimated return time.

Suggested demonstration scenario

Two travellers arrive at the same airport with overlapping layover windows. Both need a place for their cabin luggage and want to explore the city.

Layover identifies a potential match, shows an illustrative cost split, and guides the users through a storage request. The prototype then displays the booking status and a suggested return time.

The demo should clearly label simulated data and illustrative prices. A simulated booking must not be presented as a real reservation or confirmed provider availability.

---

⚠️ Current Limitations and Challenges

Layover is an experimental hackathon concept. Its practicality depends on several real-world constraints.

- Matching availability: Travellers must have compatible schedules and requirements.
- Storage-provider policies: Shared bookings may not be permitted by all facilities.
- Security and liability: Storage custody, insurance, loss, damage, and claims need clear policies.
- Price variation: Costs differ by provider, location, luggage size, and duration.
- Flight changes: Delays and cancellations can invalidate a previously suitable plan.
- Transit restrictions: Travellers may not be allowed to enter a destination or leave the airport.
- Time uncertainty: Immigration, security, transport, and boarding can take longer than expected.
- Privacy: Traveller matching must avoid exposing sensitive flight and personal details.
- Operational feasibility: Real-world deployment may require provider partnerships, payment infrastructure, and legal review.

The application should prioritise accurate information and safe alternatives rather than guaranteeing savings, storage availability, or sufficient time to explore.

---

🔮 Future Scope

Potential future enhancements include:

- Live flight-status integration and adaptive itinerary updates.
- Maps and estimated transportation times.
- Real-time storage availability and price comparison.
- Integration with authorised luggage-storage providers.
- Secure payments and transparent cost splitting.
- Verified traveller profiles and reporting mechanisms.
- Personalised recommendations based on budget and interests.
- Notifications for activity departure and return-to-airport reminders.
- Multilingual support for international travellers.
- Analytics to evaluate matching success, potential savings, and user satisfaction.

These are future possibilities, not claims about existing functionality.

---

🌱 Our Vision

We believe the time between flights can be more than a period of waiting.

It can be a chance to discover a new place, meet people, experience local culture, and travel more thoughtfully.

Layover explores a future where planning, luggage convenience, and human connection work together to make short travel windows more useful.

Less waiting. Less hassle. More exploring.

Layover — Your journey doesn't have to stop between flights.

---

🏆 Project Information

- Project: Layover
- Event: Farewell Hackathon
- Domain: Travel Technology
- Project Type: Experimental web application
- Focus Areas: Layover planning, luggage convenience, cost optimisation, and traveller matching
- Development Status: Hackathon prototype

🤝 Contributing

This project is developed as part of a collaborative hackathon.

Contributions can focus on improving the user experience, refining the matching logic, strengthening privacy and safety, or integrating reliable travel and storage information.

📄 License

No license has been specified yet. Add an appropriate open-source license before permitting reuse or redistribution of the project.

---

Built with curiosity, collaboration, and the belief that every journey has room for one more adventure.

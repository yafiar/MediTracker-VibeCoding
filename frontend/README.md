# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

# MediTracker Extensions

## Added Features

- JWT authentication (login/register)
- Medicine CRUD with image upload
- Scheduling (days + multiple times)
- Intake tracking (duplicate prevention per day)
- Search, skeleton loading, confirmation dialogs
- Toast notifications for feedback
- Local time-based medicine notifications (Web Notifications API)
- Service worker scaffold for future push support

## Notifications Usage

1. Log in (notifications only schedule on protected pages).
2. Ensure schedules have a `time` or `times[]` field set in the Schedule Management UI.
3. Click "Allow" when the browser requests notification permission.
4. Keep the tab open; reminders fire at upcoming future times today.
5. Mark doses as "Taken" to prevent further alerts for that schedule/time.
6. Toggle notifications with the floating button (bottom-right). State persists via `localStorage`.
7. View active notifications in the top-right tray; click × to dismiss.
8. Historical notifications are stored (last 200) and accessible via the Navbar link "Notifications".

## Troubleshooting Notifications

| Problem | Cause | Fix |
|---------|-------|-----|
| No popup prompt | Permission previously denied | Browser site settings -> Allow notifications for `localhost` |
| No reminders | Time already passed or schedule missing `time` | Set future time; ensure correct 24h format HH:MM |
| Duplicate alerts | Multiple overlapping schedules | Verify you didn't create duplicate schedules with same time |
| Only toast shows | Permission denied | Re-enable permission; toasts are fallback |
| Tray empty but schedule exists | Times already passed or dismissed | Create future times; tray shows only future fired alerts until dismissed |

## Next Steps (Optional Enhancements)

- Backend push notifications (VAPID + `web-push`)
- Missed dose status after grace period
- Dose adherence statistics dashboard
- Dark mode & larger font accessibility toggle
- Export notification history (CSV)

## Implementing Push Later (Outline)

1. Install `web-push` in backend, generate VAPID keys.
2. Add subscription save endpoint (`/api/subscriptions`).
3. In service worker, subscribe to push, send subscription to backend after login.
4. Cron or scheduler on backend checks upcoming times and triggers `webPush.sendNotification`.
5. Display push notification even if tab closed.

---

This README supplements the original Create React App documentation with MediTracker-specific functionality.

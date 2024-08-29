# Chat a Bit

Chat a Bit is a real-time chat application that allows users to communicate through private messages or group chats. The app features a unique async task capability, powered by a GPT model API, that suggests message responses based on a user's prompt.

## Features

- **Real-Time Communication**: Engage in private messages or group chats with other users in real time.
- **AI-Powered Response Suggestions**: Use the async task feature to receive suggested message responses based on your prompts, leveraging GPT model API.
- **Cross-Platform**: Available on web and mobile platforms, built with React.js, React Native, and Express.js.
- **Efficient Data Handling**: Utilizes PostgreSQL for the database and Redis for efficient data caching and message queuing.
- **Socket.io Integration**: Real-time message delivery powered by Socket.io.

## Technologies Used

- **Frontend**: React.js, React Native
- **Backend**: Express.js, Socket.io
- **Database**: PostgreSQL, Redis
- **Language**: TypeScript
- **AI Integration**: GPT model API

## Installation

Follow these steps to set up the project locally:

### Backend Setup:


cd backend
npm install
npm run dev


### Frontend (Web) Setup:


cd client
npm install
npm run dev


### Mobile (React Native) Setup:


cd mobile
npm install
npx expo start -c


## Usage

- **Web Application**: Run the frontend and backend servers, then navigate to the provided local address to use the web application.
- **Mobile Application**: Use the Expo CLI to start the mobile application, which can be accessed via the Expo Go app on your mobile device.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, you can reach out to the project maintainer at [arawalid90@example.com].

# Aurexa Health Mobile Assistant

A React Native mobile application that serves as an AI-powered voice assistant for Aurexa Health. This app functions as a general secretary that can understand spoken commands and reply with spoken answers.

## Features

- **Voice Input**: Capture speech and convert it to text using React Native Voice
- **Voice Output**: Convert AI responses back to speech using Expo Speech
- **OpenAI Integration**: Send recognized text to GPT-4 and receive intelligent responses
- **Request Types**: Specialized handling for different request types:
  - Draft emails
  - Schedule meetings
  - Take notes
  - Create summaries
- **Clean UI**: Modern interface with Tailwind-inspired styling
- **Settings**: Configure API keys and voice preferences

## Prerequisites

- Node.js and npm
- Expo CLI: `npm install -g expo-cli`
- OpenAI API key
- Android device or emulator

## Installation

1. Clone the repository

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Running the App

1. Start the Expo development server:
   ```
   npm start
   ```

2. Run on Android:
   - Press `a` in the terminal to run on an Android emulator
   - Or scan the QR code with the Expo Go app on your Android device

## Usage

1. **Voice Input**:
   - Tap the microphone button to start recording
   - Speak your request clearly
   - The app will automatically stop recording when you pause

2. **Text Input**:
   - Type your message in the text input field
   - Tap the send button to submit

3. **Request Types**:
   - Select the appropriate request type before speaking or typing
   - This helps the AI understand the context of your request

4. **Voice Output**:
   - Toggle the speaker button to enable/disable spoken responses

5. **Settings**:
   - Tap the settings icon to configure your API key
   - Enable/disable voice output
   - Clear chat history

## Project Structure

```
aurexa-health-mobile/
├── assets/                # Images and other static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React Context for state management
│   ├── screens/           # App screens
│   ├── services/          # API and voice services
│   └── types/             # TypeScript type definitions
├── App.tsx               # Main app component
├── app.json              # Expo configuration
└── package.json          # Dependencies and scripts
```

## Notes

- This app uses mock scheduling and email logic. In a production environment, you would integrate with actual calendar and email services.
- Voice recognition works best in quiet environments.
- The app requires internet connectivity for the OpenAI API calls.

## Future Enhancements

- Integration with actual email and calendar services
- Offline mode for basic functionality
- Voice authentication
- Custom voice models with ElevenLabs
# Note Taking Application

A simple note-taking application built with [NeutralinoJS](https://neutralino.js.org/). Users can create, update, delete, and view all saved notes. The application saves notes to the file system using NeutralinoJS's file system native API and displays OS notifications using the native API module.

## Features

- Create, update, delete, and view notes
- Notes are stored on the local file system
- OS notifications for user actions
- Lightweight and cross-platform

## Technologies Used

- **NeutralinoJS** - For native file system and OS notifications
- **React**

## Installation & Setup

### Prerequisites

Ensure you have [NeutralinoJS CLI](https://neutralino.js.org/docs/) installed.

```sh
npm install -g @neutralinojs/neu
```

### Clone the Repository

```sh
git clone https://github.com/nishred/NoteWorthy.git
cd NoteWorthy
```

### Install Dependencies

```sh
neu update
```

### Run the Application

```sh
neu run
```

## Usage

1. Open the application.
2. Create a new note by entering text and saving it.
3. View all saved notes.
4. Edit or delete notes as needed.
5. Notifications will confirm user actions.

## File Storage Mechanism

- Notes are saved as text files using NeutralinoJS’s `fs` module.
- The application reads from and writes to the local storage directory.

## OS Notifications

- Uses NeutralinoJS’s `os` module to display notifications for successful operations.

## Contributing

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions, feel free to open an issue or reach out via nlankala@horizon.csueastbay.edu

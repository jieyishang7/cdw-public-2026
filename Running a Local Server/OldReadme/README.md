# Running a Local Server
## Tutorial
---

When working with HTML files that include JavaScript that loads external files (like CSV, JSON, or other data files), you need to run a local server instead of opening the HTML file directly in your browser. This is because modern browsers block certain operations (like loading local files) for security reasons when using the `file://` protocol.

### Why You Need a Local Server

- **CORS (Cross-Origin Resource Sharing)**: Browsers block requests to local files when using `file://` protocol
- **AJAX/Fetch requests**: Loading CSV, JSON, or other data files requires HTTP protocol
- **Module imports**: ES6 modules require a server environment
- **API calls**: External API requests often require proper HTTP headers

### Method 1: Using Python (Recommended)

#### Requirements
- Python 3.x installed on your system
https://www.python.org/

#### Steps

##### Step 1: Opening the Terminal

**On Windows:**
1. Press the **Windows key** on your keyboard
2. Type **"cmd"** or **"Command Prompt"**
3. Click on **"Command Prompt"** in the search results
4. A black window with white text will open - this is your terminal

**On Mac:**
1. Press **Command (⌘)** + **Space** to open Spotlight Search
2. Type **"Terminal"**
3. Press **Enter** or click on **"Terminal"**
4. A white/black window will open - this is your terminal

##### Step 2: Navigating to Your Project Directory

**Understanding the Terminal:**
- The terminal shows your current location (called the "current directory")
- You'll see something like `C:\Users\YourUsername>` on Windows or `YourUsername-MacBook-Pro:~ YourUsername$` on Mac
- The `>` or `$` symbol means the terminal is ready for your next command

**Basic Navigation Commands:**
- `dir` (Windows) or `ls` (Mac) - shows files and folders in current location
- `cd` - changes directory (moves to a different folder)
- `cd ..` - goes up one folder level
- `cd "folder name"` - goes into a specific folder

**Step-by-Step Navigation:**

**On Windows:**
1. **Check your current location:**
   ```cmd
   dir
   ```
   This shows all files and folders in your current directory

2. **Navigate to your project:**
   ```cmd
   cd "C:\Users\yourName\Documents\GitHub\cdw-public\Temporal Structures"
   ```
   (Replace with your actual project path - where you are hosting an index.html file)


**On Mac:**
1. **Check your current location:**
   ```bash
   ls
   ```
   This shows all files and folders in your current directory

2. **Navigate to your project:**
   ```bash
   cd "/Users/YourUsername/Documents/GitHub/cdw-public/Temporal Structures"
   ```
   (Replace with your actual project path - where you are hosting an index.html file)


**If you're not sure where your project is:**
1. **On Windows:** Open File Explorer, navigate to your project folder, click in the address bar, and copy the full path
2. **On Mac:** Open Finder, navigate to your project folder, right-click the folder, hold Option key, and select "Copy as Pathname"

##### Step 3: Starting the Server

**For Python 3:**
```bash
python -m http.server 8000
```

**For Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**What happens:**
- You'll see a message like "Serving HTTP on 0.0.0.0 port 8000..."
- The terminal will appear to "freeze" - this is normal! The server is running
- **Don't close this terminal window** - it needs to stay open for the server to work

##### Step 4: Opening Your Browser

1. **Open any web browser** (Chrome, Firefox, Safari, Edge)
2. **In the address bar** (where you normally type websites), enter:
   ```
   http://localhost:8000
   ```
3. **Press Enter**


### Stopping the Server

**Important:** When you're done testing, you need to stop the server:

1. **Go back to your terminal window** (the one running the server)
2. **Press `Ctrl + C`** (hold Ctrl and press C)
3. **You'll see the terminal prompt return** - this means the server is stopped
4. **You can now close the terminal window**

**What if `Ctrl + C` doesn't work?**
- Try pressing `Ctrl + C` multiple times
- Or close the terminal window completely (this will force-stop the server)

### Helpful Tips for Beginners

**Copy and Paste in Terminal:**
- **Windows:** Right-click to paste, or press `Ctrl + V`
- **Mac:** Right-click to paste, or press `Command + V`

**If you make a mistake:**
- Press `Ctrl + C` to cancel the current command
- Type `clear` and press Enter to clear the terminal screen

**Getting your project path:**
- **Windows:** In File Explorer, click in the address bar, press `Ctrl + A` to select all, then `Ctrl + C` to copy
- **Mac:** In Finder, right-click your project folder, hold Option, select "Copy as Pathname"





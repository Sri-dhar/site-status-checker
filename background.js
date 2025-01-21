let checkInProgress = new Set();
const API_KEY = "81497bd6afmshec08b8423ad0ab0p1b8c7cjsn50bb718e8dd9"; // Added Intentionally because its not a paid API
//API_KEY might get expired later, you can get your own from https://rapidapi.com/ajith/api/check-if-website-is-up-or-down

console.log("Background script loaded");

async function logToFile(data) {
  const blob = new Blob([data], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  try {
    await browser.downloads.download({
      url: url,
      filename: `website_status_log_${new Date().toISOString()}.txt`,
      saveAs: false,
      conflictAction: "uniquify"
    });
  } catch (error) {
    console.error("Error logging data:", error);
  } finally {
    URL.revokeObjectURL(url);
  }
}

browser.runtime.onInstalled.addListener(() => {
  browser.notifications.create({
    type: "basic",
    iconUrl: browser.runtime.getURL("icons/icon-48.png"),
    title: "Extension Loaded",
    message: "Website Status Checker is now active"
  });
});

browser.webRequest.onErrorOccurred.addListener(
  handleError,
  { urls: ["<all_urls>"] }
);

async function handleError(details) {
  if (details.type !== "main_frame" || checkInProgress.has(details.url)) {
    return;
  }

  await checkWebsite(details.url, details.error);
}

async function checkWebsite(url, errorType) {
  checkInProgress.add(url);

  try {
    const domain = new URL(url).hostname;
    const isUp = await isWebsiteUp(domain);
    
    const message = isUp 
      ? `${domain} is working fine for others. This might be a local connection issue.`
      : `${domain} is down for everyone. Not just you!`;
    
    const title = isUp ? "Site NOT Down" : "Down FOR ALL";

    browser.notifications.create({
      type: "basic",
      iconUrl: browser.runtime.getURL("icons/icon-48.png"),
      title: title,
      message: message
    });

    await logToFile(
      `Time: ${new Date().toISOString()}\nURL: ${url}\nError: ${errorType}\nStatus: ${isUp ? "Up" : "Down"}\n\n`
    );

  } catch (error) {
    console.error("Error checking website status:", error);
    browser.notifications.create({
      type: "basic",
      iconUrl: browser.runtime.getURL("icons/icon-48.png"),
      title: "Error Checking Website",
      message: `Could not check status for ${url}. Please try again later.`
    });
  } finally {
    checkInProgress.delete(url);
  }
}

async function isWebsiteUp(domain) {
  const apiUrl = `https://check-if-website-is-up-or-down.p.rapidapi.com/?domain=${encodeURIComponent(domain)}`;
  
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "check-if-website-is-up-or-down.p.rapidapi.com"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.status === "Up";
  } catch (error) {
    console.error("API call failed:", error);
    throw new Error("Failed to determine website status");
  }
}

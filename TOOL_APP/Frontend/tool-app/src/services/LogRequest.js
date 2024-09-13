// src/services/loggingService.js

export const logRequest = (logData) => {
    console.log('Logging request: ', logData);
  
    // Optionally send logs to a server
    // fetch('/api/logs', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(logData),
    // }).catch(err => console.error(err));
  
    // Optionally store logs in localStorage
    // let logs = JSON.parse(localStorage.getItem('logs')) || [];
    // logs.push(logData);
    // localStorage.setItem('logs', JSON.stringify(logs));
  };
  
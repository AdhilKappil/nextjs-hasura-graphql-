export function getTimeDifference(created_at) {
    const currentDate = new Date();
    const postDate = new Date(created_at);
    const timeDifference = Math.abs(currentDate - postDate) / 1000; // in seconds
  
    if (timeDifference < 60) {
      return `${Math.floor(timeDifference)} second${Math.floor(timeDifference) !== 1 ? 's' : ''} ago`;
    } else if (timeDifference < 3600) {
      return `${Math.floor(timeDifference / 60)} minute${Math.floor(timeDifference / 60) !== 1 ? 's' : ''} ago`;
    } else if (timeDifference < 86400) {
      return `${Math.floor(timeDifference / 3600)} hour${Math.floor(timeDifference / 3600) !== 1 ? 's' : ''} ago`;
    } else {
      return `${Math.floor(timeDifference / 86400)} day${Math.floor(timeDifference / 86400) !== 1 ? 's' : ''} ago`;
    }
  }
  
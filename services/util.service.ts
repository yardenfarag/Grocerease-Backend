function makeId(length: number = 5): string {
  let txt = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function debounce(func: Function, timeout: number = 300): Function {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomName(): string {
  const names = [
    'Jhon',
    'Wick',
    'Strong',
    'Dude',
    'Yep',
    'Hello',
    'World',
    'Power',
    'Goku',
    'Super',
    'Hi',
    'You',
    'Are',
    'Awesome',
  ];
  const famName = [
    'star',
    'kamikaza',
    'family',
    'eat',
    'some',
    'banana',
    'brock',
    'david',
    'gun',
    'walk',
    'talk',
    'car',
    'wing',
    'yang',
    'snow',
    'fire',
  ];
  return (
    names[Math.floor(Math.random() * names.length)] +
    famName[Math.floor(Math.random() * names.length)]
  );
}

function generateRandomImg(): string {
  // Try to get a different image every time
  return 'pro' + Math.floor(Math.random() * 17 + 1) + '.png';
}

function timeAgo(ms: number | Date = new Date()): string {
  const date = ms instanceof Date ? ms : new Date(ms);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges: Record<string, number> = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges.hasOwnProperty(key)) {
      if (ranges[key] < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / ranges[key];
        let time = formatter.format(Math.round(delta), key as Intl.RelativeTimeFormatUnit);
        if (time.includes('in')) {
          time = time.replace('in ', '');
          time = time.replace('ago', '');
          time += ' ago';
        }
        return time;
      }
    }
  }
  return 'just now';
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

export default{
  makeId,
  getRandomInt,
  debounce,
  generateRandomName,
  timeAgo,
  generateRandomImg,
  formatDate
};

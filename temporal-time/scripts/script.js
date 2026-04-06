console.log("JS file loaded");



// Plain Date
const d = Temporal.PlainDate.from('2026-06-15')
console.log(d)
const tomorrow = d.add({ days: 1 })
console.log(tomorrow)

// Plain Time

const t = Temporal.PlainTime.from('14:30:00')
console.log(t)
const later = t.add({ hours: 2 })

//Zoned - time zone & time/date
const zdt = Temporal.ZonedDateTime.from('2026-06-15T14:30:00[America/New_York]')
// convert to Tokyo time
const inTokyo = zdt.withTimeZone('Asia/Tokyo')

// Instant - exact point in time, no timezone interpretation UTC momement
const now = Temporal.Now.instant();
const laterSec = now.add({ seconds: 3600 })
// instant one hour in the future

// Duration Length of Time
const dd = Temporal.Duration.from({ days: 5, hours: 3);
const nextWeek = today.add(dd);
const diff = dateA.until(dateB)
//duration  days: 12, hours 4, minutes 30



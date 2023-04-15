function padTime(value) {
  return String(value).padStart(2, '0');
}

function formatSrtTime(milliseconds) {
  const date = new Date(milliseconds);
  const hours = padTime(date.getUTCHours());
  const minutes = padTime(date.getUTCMinutes());
  const seconds = padTime(date.getUTCSeconds());
  const ms = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${hours}:${minutes}:${seconds},${ms}`;
}

function srtSegmentsToBlob(segments) {
  const srtContent = segments
    .map((segment, index) => {
      const start = formatSrtTime(segment.start);
      const end = formatSrtTime(segment.end);
      const text = segment.lines.join('\n');
      return `${index + 1}\n${start} --> ${end}\n${text}\n`;
    })
    .join('\n');
  return new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
}

async function fetchSrtSegments() {
  const response = await fetch(document.querySelector('.VideoPlayer video').src);
  const arrayBuffer = await response.arrayBuffer();
  const dataView = new DataView(arrayBuffer);
  const decoder = new TextDecoder('utf-8');
  const magic = dataView.getUint32(0);
  if (magic !== 0x4441414d) {
    throw new Error('Invalid file format');
  }
  const segments = [];
  let offset = 4;
  while (offset < dataView.byteLength) {
    const size = dataView.getUint32(offset);
    const chunk = new Uint8Array(arrayBuffer.slice(offset + 4, offset + 4 + size));
    const jsonString = decoder.decode(chunk);
    const segment = JSON.parse(jsonString);
    segments.push(segment);
    offset += 4 + size;
  }
  return segments;
}

async function downloadSRT() {
  try {
    const segments = await fetchSrtSegments();
    const blob = srtSegmentsToBlob(segments);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${document.querySelector('.VideoPlayer-title').textContent.trim()}.srt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to download SRT:', error);
  }
}

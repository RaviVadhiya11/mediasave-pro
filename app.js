(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('mspro-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
  if (toggle) toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    localStorage.setItem('mspro-theme', next);
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const urlInput = document.getElementById('mediaUrl');
  const nameInput = document.getElementById('fileName');
  const button = document.getElementById('downloadBtn');
  const status = document.getElementById('status');
  const historyList = document.getElementById('historyList');
  const clear = document.getElementById('clearHistory');
  const KEY = 'mspro-download-history';
  const readHistory = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
  const renderHistory = () => {
    if (!historyList) return;
    const items = readHistory();
    historyList.innerHTML = '';
    if (!items.length) { historyList.innerHTML = '<p class="small">No downloads recorded yet.</p>'; return; }
    items.slice(0,8).forEach(item => {
      const row = document.createElement('div'); row.className = 'history-item';
      const filename = document.createElement('span'); filename.textContent = item.name;
      const date = document.createElement('span'); date.textContent = item.date;
      row.append(filename,date); historyList.append(row);
    });
  };
  if (clear) clear.addEventListener('click', () => { localStorage.removeItem(KEY); renderHistory(); });
  renderHistory();

  if (button) button.addEventListener('click', async () => {
    const raw = (urlInput.value || '').trim();
    if (!raw) { status.textContent = 'Please paste a direct media-file URL.'; return; }
    let parsed;
    try { parsed = new URL(raw); } catch { status.textContent = 'Please enter a valid URL.'; return; }
    if (!['http:', 'https:'].includes(parsed.protocol)) { status.textContent = 'Only HTTP and HTTPS URLs are supported.'; return; }
    button.disabled = true; status.textContent = 'Connecting to the file host…';
    try {
      const response = await fetch(parsed.href, {mode:'cors'});
      if (!response.ok) throw new Error('The host returned HTTP ' + response.status + '.');
      const blob = await response.blob();
      if (!blob.size) throw new Error('The file appears to be empty.');
      const objectUrl = URL.createObjectURL(blob);
      const fallback = decodeURIComponent(parsed.pathname.split('/').pop() || 'media-download');
      const filename = (nameInput.value || '').trim() || fallback;
      const a = document.createElement('a'); a.href = objectUrl; a.download = filename;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
      const history = readHistory();
      history.unshift({name:filename,date:new Date().toLocaleString()});
      localStorage.setItem(KEY, JSON.stringify(history.slice(0,8)));
      renderHistory();
      status.textContent = 'Download started. If it did not start, the host may block browser downloads.';
    } catch (err) {
      status.textContent = 'Could not fetch this link. The host may block cross-origin requests (CORS), or this may be a webpage instead of a direct media file.\\n\\nDetails: ' + err.message + '\\n\\nTry a direct file URL from a host that allows browser access.';
    } finally { button.disabled = false; }
  });
})();
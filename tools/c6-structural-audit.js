// C6 structural audit, V8.33. Read-only: no data mutation.
(function () {
  const all = [...events, ...originalEvents];
  const counts = {};
  const rows = all.map(e => {
    const isOriginal = e.id.startsWith('O');
    const dossier = isOriginal ? allOriginalResearchV828[e.id] : research[e.id];
    const links = isOriginal
      ? (dossier?.sources || []).map(x => x.url).filter(Boolean)
      : [e.source, ...(dossier?.sources || []).map(x => x[1])].filter(Boolean);
    const issues = [];
    if (!Number.isFinite(e.start) || !Number.isFinite(e.end)) issues.push('invalid-date');
    if (e.start > e.end) issues.push('inverted-range');
    if (!links.length) issues.push('no-source-link');
    if (!dossier) issues.push('no-dossier');
    if (isOriginal && e.end === 2025) issues.push('open-ended-archive-range');
    if (isOriginal && !e.original) issues.push('original-flag-missing');
    if (!isOriginal && e.reviewed) issues.push('legacy-reviewed-not-c6');
    for (const issue of issues) counts[issue] = (counts[issue] || 0) + 1;
    return {id:e.id,track:isOriginal?'O':'H',links:links.length,issues,c6:'not-final'};
  });
  const ids = all.map(e => e.id);
  const duplicates = ids.filter((id,i) => ids.indexOf(id) !== i);
  return {schema:'c6-structural-v1',total:rows.length,duplicates,counts,rows};
})()
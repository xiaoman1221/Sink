import fs from 'node:fs'

const config = {
  $schema: 'node_modules/wrangler/config-schema.json',
  name: 'sink',
  main: '.output/server/index.mjs',
  assets: {
    binding: 'ASSETS',
    directory: '.output/public',
    html_handling: 'drop-trailing-slash',
  },
  compatibility_date: '2025-05-08',
  compatibility_flags: ['nodejs_compat'],
  keep_vars: true,
  upload_source_maps: true,
  observability: {
    logs: {
      enabled: true,
    },
    traces: {
      enabled: true,
    },
  },
  ai: {
    binding: 'AI',
    remote: true,
  },
  analytics_engine_datasets: [
    {
      binding: 'ANALYTICS',
      dataset: 'sink',
    },
  ],
  kv_namespaces: [
    {
      binding: 'KV',
      preview_id: process.env.KV_ID,
      id: process.env.KV_ID,
    },
  ],
  r2_buckets: [
    {
      binding: 'R2',
      preview_bucket_name: process.env.R2_BUCKET,
      bucket_name: process.env.R2_BUCKET,
    },
  ],
  triggers: {
    crons: ['0 0 * * *'],
  },
}

fs.writeFileSync(
  'wrangler.jsonc',
  JSON.stringify(config, null, 2),
)

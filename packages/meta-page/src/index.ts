import type { Meta } from '@grafana/agent-core';

const pageMeta: Meta = () => ({
  page: () => ({
    href: location.href,
  }),
});

export default pageMeta;

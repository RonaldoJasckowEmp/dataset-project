import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import { Mermaid } from '@portaljs/core';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Table: dynamic(() => import('@portaljs/components').then(mod => mod.Table)),
  Catalog: dynamic(() => import('@portaljs/components').then(mod => mod.Catalog)),
  mermaid: Mermaid,
  Vega: dynamic(() => import('@portaljs/components').then(mod => mod.Vega)),
  VegaLite: dynamic(() => import('@portaljs/components').then(mod => mod.VegaLite)),
  LineChart: dynamic(() => import('@portaljs/components').then(mod => mod.LineChart)),
  FlatUiTable: dynamic(() => import('@portaljs/components').then(mod => mod.FlatUiTable)),
  NewComponent: dynamic(() => import('./CustomComponent').then(mod => mod.default)),
  BackButton: dynamic(() => import('./BackButton').then(mod => mod.default)),
  OpponentCountChart: dynamic(() => import('./OpponentCountChart').then(mod => mod.default)),
  YearCountChart: dynamic(() => import('./YearCountChart').then(mod => mod.default)),
} as any;

export default function DRD({ source }: { source: any }) {
  return <MDXRemote {...source} components={components} />;
}

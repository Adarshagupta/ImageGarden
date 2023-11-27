import { DraggablePanelBody } from '@lobehub/ui';
import { consola } from 'consola';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useRef } from 'react';

import { PromptEditor } from '@/components';
import { selectors, useAppStore } from '@/store';
import { type DivProps } from '@/types';

const Inner = memo<DivProps>(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const sidebarReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sidebar = gradioApp().querySelector('#quicksettings');
    if (sidebar) sidebarReference.current?.append(sidebar);
    consola.success('🤯 [layout] inject - QuickSettingSidebar');
  }, []);

  return (
    <DraggablePanelBody>
      {setting.promptEditor && <PromptEditor />}
      <div ref={sidebarReference} />
    </DraggablePanelBody>
  );
});

export default Inner;

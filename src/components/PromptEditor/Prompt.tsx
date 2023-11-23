import { consola } from 'consola';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TagList, { PromptType, TagItem } from './TagList';
import { useStyles } from './style';
import { formatPrompt } from './utils';

interface PromptProps {
  type: PromptType;
}

const Prompt = memo<PromptProps>(({ type }) => {
    const [tags, setTags] = useState<TagItem[]>([]);
    const { styles } = useStyles();
    const { t } = useTranslation();

    const id =
    type === 'positive' ? "[id$='2img_prompt'] textarea" : "[id$='2img_neg_prompt'] textarea";

    const getValue = useCallback(() => {
        try {
            const textarea = get_uiCurrentTabContent().querySelector(id) as HTMLTextAreaElement;
            if (textarea) setTags(formatPrompt(textarea.value));
        } catch (error) {
            consola.error('🤯 [prompt]', error);
        }
    }, []);

    const setValue = useCallback(() => {
        try {
            const newValue = tags.map((t) => t.text).join(', ');
            const textarea = get_uiCurrentTabContent().querySelector(id) as HTMLTextAreaElement;
            if (textarea) textarea.value = newValue;
            updateInput(textarea);
        } catch (error) {
            consola.error('🤯 [prompt]', error);
        }
    }, [tags, type]);

    const setCurrentValue = useCallback((currentTags: TagItem[]) => {
        try {
            const textarea = get_uiCurrentTabContent().querySelector(id) as HTMLTextAreaElement;
            if (textarea) textarea.value = currentTags.map((t) => t.text).join(', ');
            updateInput(textarea);
        } catch (error) {
            consola.error('🤯 [prompt]', error);
        }
    }, []);

    return (
        <div className={styles.promptView}>
            <TagList setTags={setTags} setValue={setCurrentValue} tags={tags} type={type} />
            <div className={styles.buttonGroup}>
                <button
                    className="lg secondary gradio-button tool svelte-1ipelgc"
                    onClick={getValue}
                    title={t('prompt.load')}
                    type="button"
                >
          🔄
                </button>
                <button
                    className="lg secondary gradio-button tool svelte-1ipelgc"
                    onClick={setValue}
                    title={t('prompt.set')}
                    type="button"
                >
          ➡️
                </button>
            </div>
        </div>
    );
});

export default Prompt;

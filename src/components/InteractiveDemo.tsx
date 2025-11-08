'use client';

import { useState } from 'react';
import { InteractiveConfig } from '@/types/css';
import { SliderControl } from './controls/SliderControl';
import { ColorControl } from './controls/ColorControl';
import { SelectControl } from './controls/SelectControl';

interface InteractiveDemoProps {
  config: InteractiveConfig;
  propertyName: string;
}

export function InteractiveDemo({ config, propertyName }: InteractiveDemoProps) {
  // Initialize state with default values from controls
  const initialValues = config.controls.reduce((acc, control) => {
    acc[control.name] = control.defaultValue;
    return acc;
  }, {} as Record<string, string | number>);

  const [values, setValues] = useState(initialValues);

  // Update a specific control value
  const handleChange = (name: string, value: string | number) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  // Generate CSS string from current values
  const generateCSS = () => {
    // Special handling for box-shadow
    if (propertyName === 'box-shadow' && config.type === 'multi') {
      const x = values['box-shadow-x'] || 0;
      const y = values['box-shadow-y'] || 0;
      const blur = values['box-shadow-blur'] || 0;
      const spread = values['box-shadow-spread'] || 0;
      const color = values['box-shadow-color'] || '#000000';
      return `box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};`;
    }

    // Special handling for transform
    if (propertyName === 'transform' && config.type === 'multi') {
      const rotate = values['rotate'] || 0;
      const scale = values['scale'] || 1;
      return `transform: rotate(${rotate}deg) scale(${scale});`;
    }

    // Special handling for border
    if (propertyName === 'border' && config.type === 'multi') {
      const width = values['border-width'] || 0;
      const style = values['border-style'] || 'solid';
      const color = values['border-color'] || '#000000';
      return `border: ${width}px ${style} ${color};`;
    }

    // Normal handling (including regular multi-type properties)
    return config.controls.map(control => {
      const value = values[control.name];
      const unit = control.unit || '';
      return `${control.name}: ${value}${unit};`;
    }).join('\n  ');
  };

  // Convert CSS property name to camelCase for React style object
  const toCamelCase = (str: string): string => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  };

  // Generate inline style object
  const generateStyle = (): React.CSSProperties => {
    const style: Record<string, string> = {};

    // Special handling for box-shadow (multi-value property)
    if (propertyName === 'box-shadow' && config.type === 'multi') {
      const x = values['box-shadow-x'] || 0;
      const y = values['box-shadow-y'] || 0;
      const blur = values['box-shadow-blur'] || 0;
      const spread = values['box-shadow-spread'] || 0;
      const color = values['box-shadow-color'] || '#000000';
      style.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
    } else if (propertyName === 'transform' && config.type === 'multi') {
      // Special handling for transform
      const rotate = values['rotate'] || 0;
      const scale = values['scale'] || 1;
      style.transform = `rotate(${rotate}deg) scale(${scale})`;
    } else if (propertyName === 'border' && config.type === 'multi') {
      // Special handling for border
      const width = values['border-width'] || 0;
      const borderStyle = values['border-style'] || 'solid';
      const color = values['border-color'] || '#000000';
      style.border = `${width}px ${borderStyle} ${color}`;
    } else {
      // Normal handling for single-value properties
      config.controls.forEach(control => {
        const value = values[control.name];
        const unit = control.unit || '';
        const camelCaseName = toCamelCase(control.name);
        style[camelCaseName] = `${value}${unit}`;
      });
    }

    return style;
  };

  // Render preview box based on template
  const renderPreview = () => {
    const style = generateStyle();

    switch (config.preview.template) {
      case 'box':
        return (
          <div
            className={`preview-box w-32 h-32 bg-blue-500 mx-auto ${config.preview.className || ''}`}
            style={style}
          >
            {config.preview.content || ''}
          </div>
        );

      case 'text':
        return (
          <p
            className={`preview-text text-lg ${config.preview.className || ''}`}
            style={style}
          >
            {config.preview.content || 'サンプルテキスト'}
          </p>
        );

      case 'layout':
        // Special handling for position property
        if (propertyName === 'position') {
          return (
            <div className={`preview-layout ${config.preview.className || ''} border-2 border-dashed border-gray-400 dark:border-gray-500`}>
              <div className="absolute top-2 left-2 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                親要素 (relative)
              </div>
              <div
                className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center font-bold rounded shadow-lg"
                style={style}
              >
                要素
              </div>
            </div>
          );
        }

        // Special handling for flexbox properties
        if (['flex-direction', 'justify-content', 'align-items', 'gap'].includes(propertyName)) {
          return (
            <div
              className={`preview-layout w-full ${config.preview.className || ''}`}
              style={style}
            >
              <div className="bg-blue-500 text-white p-3 rounded text-sm">1</div>
              <div className="bg-green-500 text-white p-3 rounded text-sm">2</div>
              <div className="bg-purple-500 text-white p-3 rounded text-sm">3</div>
            </div>
          );
        }

        // Default layout template
        return (
          <div
            className={`preview-layout ${config.preview.className || ''}`}
            style={style}
          >
            {config.preview.content || (
              <>
                <div className="bg-gray-200 dark:bg-gray-600 p-4">アイテム1</div>
                <div className="bg-gray-300 dark:bg-gray-500 p-4">アイテム2</div>
                <div className="bg-gray-200 dark:bg-gray-600 p-4">アイテム3</div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="interactive-demo bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border border-blue-200 dark:border-gray-600">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🎮</span>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          インタラクティブデモ
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls Section */}
        <div className="controls-section">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            コントロール
          </h4>
          <div className="space-y-2">
            {config.controls.map(control => {
              if (control.type === 'slider') {
                return (
                  <SliderControl
                    key={control.name}
                    label={control.label || control.name}
                    min={control.min || 0}
                    max={control.max || 100}
                    step={control.step || 1}
                    value={values[control.name] as number}
                    unit={control.unit || ''}
                    onChange={(value) => handleChange(control.name, value)}
                  />
                );
              } else if (control.type === 'color') {
                return (
                  <ColorControl
                    key={control.name}
                    label={control.label || control.name}
                    value={values[control.name] as string}
                    onChange={(value) => handleChange(control.name, value)}
                  />
                );
              } else if (control.type === 'select') {
                return (
                  <SelectControl
                    key={control.name}
                    label={control.label || control.name}
                    value={values[control.name] as string}
                    options={control.options || []}
                    onChange={(value) => handleChange(control.name, value)}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Preview Section */}
        <div className="preview-section">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            プレビュー
          </h4>
          <div className="preview-container bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-600 min-h-[200px] flex items-center justify-center">
            {renderPreview()}
          </div>
        </div>
      </div>

      {/* Generated CSS Code */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          生成されたCSS
        </h4>
        <div className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto">
          <code className="text-sm text-green-400 font-mono whitespace-pre">
            {`.element {\n  ${generateCSS()}\n}`}
          </code>
        </div>
      </div>
    </div>
  );
}

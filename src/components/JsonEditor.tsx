'use client'

import { useRef, useEffect } from 'react'
import Editor, { OnMount } from '@monaco-editor/react'

interface JsonEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  readOnly?: boolean
}

export default function JsonEditor({ 
  value, 
  onChange, 
  language = 'json',
  readOnly = false 
}: JsonEditorProps) {
  const editorRef = useRef<any>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor

    // Configure JSON schema validation
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [],
      enableSchemaRequest: false,
      allowComments: true,
      trailingCommas: 'ignore',
    })

    // Set editor options
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      wordWrap: 'on',
      readOnly: readOnly,
    })
  }

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={(value) => onChange(value || '')}
      onMount={handleEditorDidMount}
      theme="vs-light"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on',
        readOnly: readOnly,
      }}
    />
  )
}

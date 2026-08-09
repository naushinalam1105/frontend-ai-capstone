import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Structured JSON response mimicking LLM generation
    const generatedSpec = {
      componentCode: `import React from 'react';\nimport { useForm } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\nimport { z } from 'zod';\n\nconst Schema = z.object({\n  input: z.string().min(2, 'Minimum 2 characters required'),\n});\n\nexport const ${prompt.replace(/[^a-zA-Z0-9]/g, '') || 'GeneratedComponent'} = () => {\n  const { register, handleSubmit, formState: { errors } } = useForm({\n    resolver: zodResolver(Schema)\n  });\n\n  return (\n    <form onSubmit={handleSubmit(() => {})} className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">\n      <div>\n        <label htmlFor="field" className="block text-sm font-medium text-slate-700">${prompt}</label>\n        <input \n          id="field" \n          {...register('input')} \n          aria-invalid={!!errors.input} \n          aria-describedby="field-error" \n          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"\n        />\n        {errors.input && (\n          <p id="field-error" role="alert" className="mt-1 text-xs text-red-600">\n            {errors.input.message as string}\n          </p>\n        )}\n      </div>\n      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500">\n        Submit\n      </button>\n    </form>\n  );\n};`,
      zodSchema: `import { z } from 'zod';\n\nexport const ${prompt.replace(/[^a-zA-Z0-9]/g, '') || 'Form'}Schema = z.object({\n  input: z.string().min(2, 'Must be at least 2 characters'),\n});`,
      a11yChecklist: [
        'Explicit <label htmlFor="field"> association for screen reader discovery',
        'Dynamic aria-invalid attribute tied directly to form error states',
        'Error messages mapped with aria-describedby and role="alert"',
        'Visible focus rings (focus:ring-2) enforced across input and submit elements',
      ],
    };

    return NextResponse.json(generatedSpec);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
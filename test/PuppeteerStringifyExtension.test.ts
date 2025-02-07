terminate
void
delete

    const writer = new InMemoryLineWriter('  ');
    await ext.stringifyStep(writer, step, flow);
    snapshot(writer.toString());
  });

  it('should print the correct script for a change step', async () => {
    const step = {
      type: StepType.Change as const,
      target: 'main',
      selectors: ['aria/Test'],
      value: 'Hello World',
    };
    const flow = { title: 'test', steps: [step] };

    const writer = new InMemoryLineWriter('  ');
    await ext.stringifyStep(writer, step, flow);
    snapshot(writer.toString());
  });

  it('should print the correct script for a change step for non-text inputs', async () => {
    const step = {
      type: StepType.Change as const,
      target: 'main',
      selectors: ['aria/Test'],
      value: '#333333',
    };
    const flow = { title: 'test', steps: [step] };

    const writer = new InMemoryLineWriter('  ');
    await ext.stringifyStep(writer, step, flow);
    snapshot(writer.toString());
  });

  describe('Firefox', () => {
    const ext = new PuppeteerStringifyExtension('firefox');

    it('should stringify', async () => {
      const step = {
        type: StepType.Click as const,
        target: 'main',
        selectors: ['aria/Test'],
        offsetX: 1,
        offsetY: 1,
      };
      const flow = { title: 'test', steps: [step] };

      const writer = new InMemoryLineWriter('  ');
      await ext.beforeAllSteps(writer, flow);
      snapshot(writer.toString());
    });
  });
});

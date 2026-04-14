import { cotorlEventConfig } from '../config/eventconfig.js';
import configs from '@/configs/index.js';
///快速生成事件方法
export function fast_build_event($this) {
  if (
    cotorlEventConfig[$this.element.type] !== undefined &&
    cotorlEventConfig[$this.element.type].length > 0
  ) {
    if ($this.element.options.eventlist === undefined) {
      $this.element.options.eventlist = [];
    }
    let default_element = cotorlEventConfig[$this.element.type][0];
    const result = kylinjson.kylinjson({
      path: "$..options.eventlist[?(@.label=='" + default_element.label + "')]",
      json: $this.element,
      key: configs.keycode,
    });
    if (result.length === 0) {
      $this.element.options.eventlist.push({
        label: default_element.label,
        value: default_element.getfunction($this.element),
        content: default_element.content,
      });
    }
    $this.$event.buildhtmlcode();
  } else {
    $this.$message.error('没找到控件的默认事件！');
  }
}

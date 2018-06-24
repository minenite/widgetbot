export function flattenAst(node, parent?) {
  if (Array.isArray(node)) {
    for (let n = 0; n < node.length; n++) {
      node[n] = flattenAst(node[n], parent)
    }

    return node
  }

  if (node.content != null) {
    node.content = flattenAst(node.content, node)
  }

  if (parent != null && node.type === parent.type) {
    return node.content
  }

  return node
}

export function astToString(node) {
  function inner(node, result = []) {
    if (Array.isArray(node)) {
      node.forEach(subNode => astToString(subNode))
    } else if (typeof node.content === 'string') {
      result.push(node.content)
    } else if (node.content != null) {
      astToString(node.content)
    }

    return result
  }

  return inner(node).join('')
}

export const recurse = (node, recurseOutput, state) =>
  typeof node.content === 'string'
    ? node.content
    : recurseOutput(node.content, state)

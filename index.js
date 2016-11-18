"use strict";
const VERSION = '0.0.1'
var options = { classPrefix: 'bbcode', newLine: false, allowData: false, allowClasses: false }

const parseAttributes = (tag, attrs) =>
{
  let obj = {attr: {}, class: [], data: {}}
  if (!attrs) return obj

  attrs = attrs.match(/[a-zA-Z0-9_-]+=(\'|").*?(\'|")/g)
  if (attrs)
  {
    for (var i = 0; i < attrs.length; i++)
    {
      let tmp = attrs[i]
      tmp = tmp.trim().split('=').map((k) => { return k.replace(/(^(\'|")+|(\'|")+$)/mg, '') })
      if (tmp[0] === 'class')
      {
        obj.class.push(tmp[1])
      }
      else
      {
        let type = (tmp[0].includes('data-')) ? 'data' : 'attr'
        obj[type][tmp[0]] = tmp[1]
      }
    }
  }

  return obj
}

const parseDataAttrs = (dataList) =>
{
  let dataTags = ''
  Object.keys(dataList).forEach((b) => { dataTags += ' '+b+'="'+dataList[b]+'" ' })
  return dataTags
}

const parseTag = (string, tag, attrs, value) =>
{
  tag = tag.toLowerCase()
  let val = ''
  let parseAttr = parseAttributes(tag, /\[(.*?)\]/g.exec(string)[1])
  let tagDetails = {
    attr: parseAttr.attr,
    data: (options.allowData) ? parseDataAttrs(parseAttr.data) : '',
    class: (options.allowClasses) ? options.classPrefix+' '+parseAttr.class.join(' ')+' ' : options.classPrefix+' ',
  }

  switch (tag)
  {
    case 'quote':
      val = '<div class="' + tagDetails.class + 'quote"'+ tagDetails.data
      if (tagDetails.attr.author) val += ' data-author="'+tagDetails.attr.author+'"'
      if (tagDetails.attr.name) val += ' data-name="'+tagDetails.attr.name+'"'
      return val + '>' + ((tagDetails.attr.name) ? tagDetails.attr.name + ' wrote:' : '') + '<blockquote>' + value + '</blockquote></div>'
    case 'url':
      val = '<a class="' + tagDetails.class + 'link" '+ tagDetails.data
      if (tagDetails.attr.alt) val += ' alt="'+tagDetails.attr.alt+'"'
      return val + ' target="_blank" href="' + tagDetails.attr.url + '">' + value + '</a>'
    case 'email':
      val = '<a class="' + tagDetails.class + 'link" '+ tagDetails.data
      if (tagDetails.attr.alt) val += ' alt="'+tagDetails.attr.alt+'"'
      return val + ' target="_blank" href="' + tagDetails.attr.email + '">' + value + '</a>'
    case 'b':
      return '<strong '+ tagDetails.data +' >' + value + '</strong>'
    case 'i':
      return '<em '+ tagDetails.data +' >' + value + '</em>'
    case 'u':
      return '<span style="text-decoration:underline" '+ tagDetails.data +' >' + value + '</span>'
    case 's':
      return '<span style="text-decoration:line-through" '+ tagDetails.data +' >' + value + '</span>'
    case 'indent':
      return '<blockquote '+ tagDetails.data +' >' + value + '</blockquote>'
    case 'list':
    case 'ol':
    case 'ul':
      if (tag === 'list') tag = 'ul'
      val = '<' + tag + ' ' + tagDetails.data + ' class="' + tagDetails.class + '">'
      val += value.replace(new RegExp('\\[li]((?:.|[\r\n])*?)\\[/li]', 'ig'), (string, value) => { return '<li>'+value.trim()+'</li>' })
      return val + '</' + tag + '>'
    case 'code':
    case 'php':
    case 'java':
    case 'javascript':
    case 'cpp':
    case 'ruby':
    case 'python':
      return '<pre class="' + tagDetails.class + (tag === 'code' ? '' : 'code_') + tag + '" '+ tagDetails.data +' >' + value + '</pre>'
    case 'highlight':
      return '<span class="' + tagDetails.class + tag + '" style="background-color: '+tagDetails.attr.color+'" '+ tagDetails.data +' >' + value + '</span>'
    case 'color':
      return '<span class="' + tagDetails.class + tag + '" style="color: '+tagDetails.attr.color+'" '+ tagDetails.data +'>' + value + '</span>'
    case 'span':
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return '<' + tag + tagDetails.data +'>' + value + '</' + tag + '>'
    case 'img':
      val = '<img class="' + tagDetails.class + 'image" src="' + value +' '+ tagDetails.data +'"'
      if (tagDetails.attr.width) val += ' width="'+tagDetails.attr.width+'px"'
      if (tagDetails.attr.height) val += ' height="'+tagDetails.attr.height+'px"'
      if (tagDetails.attr.title) val += ' title="'+tagDetails.attr.title+'"'
      if (tagDetails.attr.alt) val += ' alt="'+tagDetails.attr.alt+'"'
      return val + '>'
  }

  return string
}

const bbcode = module.exports =
{
  render: (content, newOptions) =>
  {
    let regex = new RegExp('\\[(\\w+)(?:[= ]([^\\]]+))?]((?:.|[\r\n])*?)\\[/\\1]', 'ig')

    options = Object.assign(options, newOptions)
    if (newOptions.newLine) content = content.replace(/\r?\n/g, '<br>')
    return content.replace(regex, parseTag.bind())
  },

  version: VERSION,
}

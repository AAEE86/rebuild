/*!
Copyright (c) REBUILD <https://getrebuild.com/> and/or its owners. All rights reserved.

rebuild is dual-licensed under commercial and open source licenses (GPLv3).
See LICENSE and COMMERCIAL in the project root for license information.
*/

const UNICON_NAME = 'texture'
const TYPE_PARENT = '$PARENT$'

let _Share2
let _entities = {}

$(document).ready(() => {
  $('.J_add-menu').on('click', () => render_item({}, true))

  // 系统内置
  $('#sys-built > option').each(function () {
    const $this = $(this)
    _entities[$this.attr('value')] = { icon: $this.attr('data-icon'), label: $this.text() }
  })

  $.get('/commons/metadata/entities?detail=true', (res) => {
    $(res.data).each(function () {
      if (!$isSysMask(this.label)) {
        $(`<option value="${this.name}">${this.label}</option>`).appendTo('.J_menuEntity optgroup:eq(0)')
      }
      _entities[this.name] = this
    })

    const $ref = $('.J_menuEntity')
      .select2({
        placeholder: $L('选择关联项'),
        allowClear: false,
        templateResult: function (res) {
          const $span = $('<span class="icon-append"></span>').attr('title', res.text).text(res.text)
          const found = _entities[res.id]
          if (found) $(`<i class="icon zmdi zmdi-${found.icon}"></i>`).appendTo($span)
          return $span
        },
      })
      .on('change', () => {
        if (item_current_isNew === true) {
          const d = _entities[$ref.val()]
          if (d) {
            $('.J_menuIcon>i').attr('class', use_icon(d.icon))
            $('.J_menuName').val(d.label)
          }
        }

        if ($ref.val() === TYPE_PARENT) $('.J_parentOption').show()
        else $('.J_parentOption').hide()
      })
  })

  $('.J_menuIcon').on('click', () => {
    parent.clickIcon = function (s) {
      $('.J_menuIcon>i').attr('class', use_icon(s))
      parent.RbModal.hide()
    }
    parent.RbModal.create('/p/common/search-icon', $L('选择图标'))
  })

  $('.J_menuConfirm').on('click', () => {
    const name = $val('.J_menuName')
    if (!name) return RbHighbar.create($L('请输入菜单名称'))

    const type = $('.J_menuType.active').attr('href').substr(1)
    let value
    if (type === 'ENTITY') {
      value = $('.J_menuEntity').val()
      if (!value) return RbHighbar.create($L('请选择关联项'))
    } else {
      value = $val('.J_menuUrl')
      if (!value) {
        return RbHighbar.create($L('请输入外部地址'))
      } else if (!($regex.isUrl(value) || $regex.isUrl(`https://getrebuild.com${value}`))) {
        return RbHighbar.create($L('请输入有效的外部地址'))
      }
    }

    let icon = $('.J_menuIcon>i').attr('class').replace('zmdi zmdi-', '')
    icon = icon.replace('mdi zmdi ', '') // V2
    render_item({
      id: item_currentid,
      text: name,
      type: type,
      value: value,
      icon: icon,
      open: $val($('#defaultOpen')),
    })

    item_currentid = null
    $('.J_config li').removeClass('active')
    $('.J_edit-menu').addClass('hide')
    $('#defaultOpen').attr('checked', false)
  })

  let overwriteMode = false
  let cfgid = $urlp('id')
  if (!cfgid) cfgid = $.cookie('AppHome.Nav') // v4.0 优先当前
  const _save = function (cfg) {
    const $btn = $('.J_save').button('loading')
    const std = _Share2 ? _Share2.getData() : { shareTo: 'SELF' }
    $.post(`/app/settings/nav-settings?id=${cfgid || ''}&configName=${$encode(std.configName || '')}&shareTo=${std.shareTo || ''}`, JSON.stringify(cfg), (res) => {
      $btn.button('reset')
      if (res.error_code === 0) parent.location.reload()
    })
  }

  $('.J_save').on('click', () => {
    const navItems = []
    $('.J_config>.dd-item').each(function () {
      const $item = build_item($(this), navItems)
      if ($item) navItems.push($item)
    })
    if (navItems.length === 0) return RbHighbar.create($L('请至少设置 1 个菜单项'))

    if (overwriteMode) {
      RbAlert.create($L('保存将覆盖你现有的导航菜单。继续吗？'), {
        confirm: function () {
          this.hide()
          _save(navItems)
        },
      })
    } else {
      _save(navItems)
    }
  })

  // 加载

  use_sortable('.J_config')
  $.get(`/app/settings/nav-settings?id=${cfgid || ''}`, (res) => {
    if (res.data) {
      cfgid = res.data.id
      $logRBAPI(cfgid, 'Nav')
      $(res.data.config).each(function () {
        const $item = render_item(this)
        if (this.sub) {
          const $subUl = $('<ul></ul>').appendTo($item)
          $(this.sub).each(function () {
            render_item(this, false, $subUl)
          })
          use_sortable($subUl)
        }
      })

      // 覆盖自有配置
      overwriteMode = !rb.isAdminUser && res.data.shareTo !== 'SELF'
    }

    const _current = res.data || {}
    $.get('/app/settings/nav-settings/alist', (res) => {
      const alist = res.data || []
      const c = alist.find((x) => x[0] === _current.id)

      if (rb.isAdminUser) {
        const shareTo39 = _current.id ? _current.shareTo : 'ALL'
        renderRbcomp(<Share2 title={$L('导航菜单')} list={alist} configName={c ? c[1] : ''} shareTo={shareTo39} id={_current.id} />, 'shareTo', function () {
          _Share2 = this

          const $menu = $(this._$switch).find('.dropdown-menu')
          $('<div class="dropdown-divider"></div>').prependTo($menu)
          $(`<a class="dropdown-item">${$L('配置顶部菜单')} <sup class="rbv"></sup></a>`)
            .prependTo($menu)
            .on('click', () => {
              if (rb.commercial < 1) {
                RbHighbar.error(WrapHtml($L('免费版不支持顶部菜单功能 [(查看详情)](https://getrebuild.com/docs/rbv-features)')))
              } else {
                renderRbcomp(<TopNavSettings list={alist} />)
              }
            })
        })
      } else {
        // eslint-disable-next-line no-undef
        renderSwitchButton(alist, $L('导航菜单'), c ? c[0] : null)
      }

      // 有自有才提示覆盖
      if (overwriteMode) {
        const haveSelf = alist.find((x) => x[2] === 'SELF')
        overwriteMode = !!haveSelf
      }
    })
    // ~
  })
})

const use_sortable = function (el) {
  $(el)
    .sortable({
      placeholder: 'dd-placeholder',
      handle: '>.dd3-handle',
      axis: 'y',
    })
    .disableSelection()
}

const build_item = function (item) {
  const data = {
    text: $trim(item.find('.dd3-content').eq(0).text()),
    type: item.attr('attr-type'),
    value: item.attr('attr-value'),
    icon: item.attr('attr-icon'),
  }
  if (!data.value) return null

  if (data.value === TYPE_PARENT) {
    data.open = item.attr('attr-open') === 'true'
  }

  const $subNavs = item.find('ul>li')
  if ($subNavs.length > 0) {
    data.sub = []
    $subNavs.each(function () {
      const sub = build_item($(this))
      if (sub) data.sub.push(sub)
    })
  }
  return data
}

let item_currentid
let item_current_isNew

const render_item = function (data, isNew, append2) {
  data.id = data.id || $random()
  data.text = data.text || $L('未命名')
  data.icon = data.icon || UNICON_NAME
  append2 = append2 || '.J_config'

  let $item = $('.J_config').find(`li[attr-id='${data.id}']`)
  if ($item.length === 0) {
    $item = $('<li class="dd-item dd3-item"><div class="dd-handle dd3-handle"></div><div class="dd3-content"><i class="icon"></i><span></span></div></li>').appendTo(append2)
    const $action = $('<div class="dd3-action"></div>').appendTo($item)
    $(`<a class="J_del" title="${$L('置顶')}"><i class="zmdi zmdi-format-valign-top"></i></a>`)
      .appendTo($action)
      .off('click')
      .on('click', () => $item.prependTo($item.parent()))

    if ($(append2).hasClass('J_config')) {
      $(`<a class="J_addsub" title="${$L('添加子菜单')}"><i class="zmdi zmdi-plus"></i></a>`)
        .appendTo($action)
        .off('click')
        .on('click', () => {
          let $subUl = $item.find('ul')
          if ($subUl.length === 0) {
            $subUl = $('<ul></ul>').appendTo($item)
            use_sortable($subUl)
          }

          render_item({}, true, $subUl)
          fix_parents()
        })
    }

    $(`<a class="J_del" title="${$L('移除')}"><i class="zmdi zmdi-close"></i></a>`)
      .appendTo($action)
      .off('click')
      .on('click', () => {
        $item.remove()
        fix_parents()
      })
  }

  const $content = $item.find('.dd3-content').eq(0)
  $content.find('>i').attr('class', use_icon(data.icon))
  $content.find('span').text(data.text)
  $item.attr({
    'attr-id': data.id,
    'attr-type': data.type || 'ENTITY',
    'attr-value': data.value || '',
    'attr-icon': data.icon,
    'attr-open': data.open || '',
  })

  // event
  $content.off('click').on('click', () => {
    $('.J_config li').removeClass('active')
    $item.addClass('active')

    $('.J_edit-menu').removeClass('hide')

    $('.J_menuName').val(data.text)
    $('.J_menuIcon>i').attr('class', use_icon(data.icon))
    $('.J_menuUrl, .J_menuEntity').val('')

    if (data.type === 'URL') {
      $('.J_menuType:eq(1)')[0].click()
      $('.J_menuUrl').val(data.value)
    } else {
      $('.J_menuType:eq(0)')[0].click()
      data.value = $item.attr('attr-value') // force renew
      const $me = $('.J_menuEntity').val(data.value).trigger('change')

      if (data.value === TYPE_PARENT) {
        $me.attr('disabled', true)
        $('.J_parentOption').show()
        $('#defaultOpen')[0].checked = data.open === true
      } else {
        $me.attr('disabled', false)
        $('.J_parentOption').hide()
      }

      // 实体已经不存在
      // if (_entity_data[data.value]) $me.removeClass('is-invalid')
      // else $me.addClass('is-invalid')
    }

    item_currentid = data.id
  })

  if (isNew === true) {
    $content.trigger('click')
    $('.J_menuName').focus()
  }

  item_current_isNew = isNew
  return $item
}

const fix_parents = function () {
  $('.J_config>li').each(function () {
    const $me = $(this)
    if ($me.find('ul>li').length > 0) $me.attr({ 'attr-value': TYPE_PARENT })
    else if ($me.attr('attr-value') === TYPE_PARENT) $me.attr({ 'attr-value': '' })
  })
}

const use_icon = function (icon) {
  return icon.startsWith('mdi-') ? `mdi zmdi ${icon}` : `zmdi zmdi-${icon}`
}

// eslint-disable-next-line no-undef
class TopNavSettings extends Share2Switch {
  renderContent() {
    const tops = this.state.tops || []

    return (
      <RF>
        <div className="rb-scroller" ref={(s) => (this._$scrollbar = s)}>
          <div className="topnav-list">
            {tops.map((item) => {
              return (
                <div key={item[0]}>
                  <div className="row">
                    <div className="col-6">
                      <span className="J_nav-name nav-name-text pt-2 text-ellipsis">
                        <span>{item[1] || $L('未命名')}</span>
                        <a
                          title={$L('编辑')}
                          onClick={(e) => {
                            const $ns = $(e.currentTarget).parent().addClass('hide')
                            $ns.next().removeClass('hide')
                            setTimeout(() => $ns.next().find('input').focus(), 100)
                          }}>
                          <i className="zmdi zmdi-edit" />
                        </a>
                      </span>
                      <span className="J_nav-name nav-name-edit hide">
                        <input className="form-control form-control-sm" defaultValue={item[1] || $L('未命名')} maxLength="100" />
                      </span>
                    </div>
                    <div className="col-2 pr-0 pl-0">
                      <label className="custom-control custom-checkbox custom-control-inline custom-control-sm mb-0 mt-2 mr-0">
                        <input className="custom-control-input" type="checkbox" defaultChecked={item[2]} data-id={item[0]} />
                        <span className="custom-control-label">{$L('显示')}</span>
                      </label>
                    </div>
                    <div className="col-4 pl-0">
                      <select className="form-control form-control-sm" defaultValue={item[3] || ''}>
                        <option value="">{$L('仪表盘')}</option>
                        {(this.state.dashList || []).map((d) => {
                          return (
                            <option key={d[0]} value={d[0]}>
                              {d[4]}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {tops.length === 0 && <p className="text-muted">{$L('暂无数据')}</p>}
        </div>

        {tops.length > 0 && (
          <div style={{ margin: '5px 15px' }}>
            <button className="btn btn-primary" type="button" onClick={() => this.handleConfirm()}>
              {$L('确定')}
            </button>
          </div>
        )}
      </RF>
    )
  }

  componentDidMount() {
    super.componentDidMount()

    $.get('/app/settings/nav-settings/topnav', (res) => {
      const alist = this.props.list
      const shows = res.data || []

      const tops = []
      shows.forEach((item) => {
        const found = alist.find((x) => x[0] === item[0])
        if (found) {
          tops.push([found[0], found[1], true, item[1] || null])
        }
      })

      alist.forEach((item) => {
        const exists = tops.find((x) => x[0] === item[0])
        if (!exists) {
          tops.push([item[0], item[1], false, null])
        }
      })

      $.get('/dashboard/dash-gets', (res2) => {
        this.setState(
          {
            tops: tops,
            dashList: res2.data || [],
          },
          () => {
            $(this._$scrollbar)
              .find('.topnav-list')
              .sortable({
                handle: '.J_nav-name',
                axis: 'y',
              })
              .disableSelection()
          }
        )
      })
    })
  }

  handleConfirm() {
    let newNameChanged = false
    const sets = []
    $(this._$scrollbar)
      .find('input.custom-control-input')
      .each((idx, item) => {
        const n = $(item).data('id')
        const d = $(item).parents('.row').find('select').val()
        const oldName = $(item).parents('.row').find('.nav-name-text>span').text()
        const newName = $(item).parents('.row').find('input').val()

        // eslint-disable-next-line eqeqeq
        sets.push([n, d || null, oldName == newName ? null : newName, $val(item)])
        // eslint-disable-next-line eqeqeq
        if (oldName != newName) newNameChanged = true
      })

    $.post('/app/settings/nav-settings/topnav', JSON.stringify(sets), () => {
      this.hide()
      setTimeout(() => {
        if (newNameChanged) location.reload()
      }, 200)
    })
  }
}

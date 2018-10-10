<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/_include/Head.jsp"%>
<link rel="stylesheet" type="text/css" href="${baseUrl}/assets/css/form-design.css">
<title>配置布局</title>
</head>
<body>
<div class="rb-wrapper rb-fixed-sidebar rb-collapsible-sidebar rb-collapsible-sidebar-hide-logo rb-aside">
	<jsp:include page="/_include/NavTop.jsp">
		<jsp:param value="实体管理" name="pageTitle"/>
	</jsp:include>
	<jsp:include page="/_include/NavLeftAdmin.jsp">
		<jsp:param value="entities" name="activeNav"/>
	</jsp:include>
	<div class="rb-content">
		<aside class="page-aside">
			<div class="rb-scroller-aside rb-scroller">
				<div class="aside-content">
					<div class="content">
						<div class="aside-header">
							<button class="navbar-toggle collapsed" type="button"><span class="icon zmdi zmdi-caret-down"></span></button>
							<span class="title">${entityLabel}</span>
							<p class="description">${comments}</p>
						</div>
					</div>
					<div class="aside-nav collapse">
						<ul class="nav">
							<li><a href="base"><i class="icon mdi mdi-inbox"></i>基本信息</a></li>
							<li><a href="fields"><i class="icon mdi mdi-inbox"></i>管理字段</a></li>
							<li class="active"><a href="form-design"><i class="icon mdi mdi-inbox"></i>配置布局</a></li>
						</ul>
					</div>
				</div>
			</div>
        </aside>
		<div class="main-content container-fluid">
			<div class="row">
				<div class="col-12 col-sm-8">
					<div class="float-right" style="margin-top:-1px">
						<a class="btn btn-link J_add-divider">+ 添加分栏</a>
						<button class="btn btn-primary J_save" type="button">保存配置</button>
					</div>
					<div class="tab-container">
                		<ul class="nav nav-tabs nav-tabs-classic">
							<li class="nav-item"><a class="nav-link active" href="#form-design">表单/视图布局</a></li>
						</ul>
		                <div class="tab-content">
							<div class="tab-pane active">
								<div class="form-preview view-preview dd-list connectedSortable">
									<div class="nodata">拖动右侧字段到这里</div>
								</div>
								<div class="clearfix"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-sm-4">
					<div class="card">
						<div class="card-header">
							字段列表
							<div class="float-right"><span class="not-nullable">必填字段</span><span class="readonly">只读字段</span></div>
						</div>
						<div class="card-body" style="padding-top:6px">
							<div class="field-list dd-list connectedSortable">
								<div class="nodata">全部字段已布局</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<%@ include file="/_include/Foot.jsp"%>
<script type="text/javascript">
$(document).ready(function(){
	const config = JSON.parse('${FormConfig}' || '[]');
	$.get('../list-field?entity=${entityName}', function(res){
		let validFields = {},
			configFields = [];
		$(config.elements).each(function(){
			configFields.push(this.field);
		});
		$(res.data).each(function(){
			validFields[this.fieldName] = this;
			if (configFields.contains(this.fieldName) == false){
				render_item(this, '.field-list');
			}
		});
		
		$(config.elements).each(function(){
			let field = validFields[this.field]
			if (this.field == '$DIVIDER$'){
				render_item({ fieldName: this.field, fieldLabel: this.label || '分栏', isFull: true }, '.form-preview');
			} else if (!!!field){
				$('<div class="dd-item"><div class="dd-handle J_field text-danger text-center">字段 [' + this.field.toUpperCase() + '] 已删除</div></div>').appendTo('.form-preview');
			} else {
				render_item({ ...field, isFull: this.isFull || false }, '.form-preview');
			}
		});
		
	    checkEmpty()
	    $('.form-preview, .field-list').sortable({
			connectWith: '.connectedSortable',
			cursor: 'move',
			placeholder: 'dd-placeholder',
			cancel: '.nodata',
			stop: checkEmpty
		}).disableSelection();
	});
	
	$('.J_add-divider').click(function(){
		render_item({ fieldName: '$DIVIDER$', fieldLabel: '分栏', isFull: true }, '.form-preview')
	});
	
	let btn = $('.J_save').click(function(){
		let elements = [];
		$('.form-preview .J_field').each(function(){
			let item = { field: $(this).data('field'), isFull: $(this).parent().hasClass('full') }
			if (item.field == '$DIVIDER$') item.label = $(this).find('span').text()
			elements.push(item);
		});
		
		let _data = { belongEntity:'${entityName}', type:'FORM', config:JSON.stringify(elements) };
		_data.metadata = { entity:'LayoutConfig', id:config.id || null };
		btn.button('loading');
		$.post('form-update', JSON.stringify(_data), function(res){
			if (res.error_code == 0) location.reload();
			else rb.notice(res.error_msg, 'danger')
		});
	});
});
const render_item = function(data, append) {
	let item = $('<div class="dd-item"></div>').appendTo(append)
	if (data.isFull == true) item.addClass('full')
	
	let handle = $('<div class="dd-handle J_field" data-field="' + data.fieldName + '"><span>' + data.fieldLabel + '</span></div>').appendTo(item)
	if (data.builtin == true) handle.addClass('readonly')
	else if (data.nullable == false) handle.addClass('not-nullable')
	
	let actions = $('<div class="dd-action"></div>').appendTo(handle)
	if (data.displayType){
		$('<a href="javascript:;" class="J_half-show" title="双列">[双]</a>').appendTo(actions).click(function(){
			item.removeClass('full')
		})
		$('<a href="javascript:;" class="J_full-show" title="单列">[单]</a>').appendTo(actions).click(function(){
			item.addClass('full')
		})
		$('<i>' + data.displayType.split('(')[0].trim() + '</i>').appendTo(actions)
	}
	
	if (data.fieldName == '$DIVIDER$'){
		item.addClass('divider')
		$('<a href="javascript:;" title="修改分栏名称">[修改]</a>').appendTo(actions).click(function(){
			let input = '<div style="width:360px;margin:0 auto;"><input type="text" class="form-control form-control-sm" placeholder="输入分栏名称"></div>'
			rb.alter(input, '修改分栏名称', { html: true, confirm: function(){
				this.hide()
				let name = $(this.refs['rbalter']).find('input').val() || '分栏';
				if (name){
					handle.find('span').text(name)
				}
			} })
		})
	}
	
};
const checkEmpty = function(){
	if ($('.field-list .dd-item').length == 0){
		$('.field-list .nodata').show()
	}else{
		$('.field-list .nodata').hide()
	}
	if ($('.form-preview .dd-item').length == 0){
		$('.form-preview .nodata').show()
	}else{
		$('.form-preview .nodata').hide()
	}
}
</script>
</body>
</html>

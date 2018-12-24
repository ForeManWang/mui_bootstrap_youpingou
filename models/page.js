function Page(page) {
	this.page = page.page;
	this.size = page.size;
	this.data = page.data;
	this.count = page.count;
	this.pageSize=page.pageSize;
	this.total=page.total;
};
module.exports = Page;
